import { NextResponse } from "next/server";
import { tokenConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

function numberFrom(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[$,%\s,]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function deepFind(obj: unknown, keys: string[]): number | null {
  if (!obj || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(record, key)) {
      const found = numberFrom(record[key]);
      if (found !== null) return found;
    }
  }
  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      const found = deepFind(value, keys);
      if (found !== null) return found;
    }
  }
  return null;
}

async function getJson(url: string) {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        accept: "application/json",
        "user-agent": "Mozilla/5.0 beancat-market/1.0",
      },
    });
    if (!response.ok) return { ok: false, status: response.status, data: null as unknown };
    return { ok: true, status: response.status, data: await response.json() as unknown };
  } catch {
    return { ok: false, status: 0, data: null as unknown };
  }
}

function findAcross(sources: unknown[], keys: string[]) {
  for (const source of sources) {
    const result = deepFind(source, keys);
    if (result !== null) return result;
  }
  return null;
}

export async function GET() {
  const address = tokenConfig.contract;
  const base = `https://api.arc-scan.org/v1/tokens/${address}`;

  const [tokenResult, infoResult, holdersResult] = await Promise.all([
    getJson(base),
    getJson(`${base}/info`),
    getJson(`${base}/holders?limit=1`),
  ]);

  const sources = [infoResult.data, tokenResult.data, holdersResult.data];

  const price = findAcross(sources, [
    "price_usd", "priceUsd", "usd_price", "usdPrice", "price", "spot_price", "spotPrice", "token_price", "tokenPrice",
  ]);
  const liquidity = findAcross(sources, [
    "liquidity_usd", "liquidityUsd", "total_liquidity_usd", "totalLiquidityUsd", "pool_depth_usd", "poolDepthUsd", "depth_usd", "depthUsd", "pool_depth", "poolDepth", "liquidity",
  ]);
  const directMarketCap = findAcross(sources, [
    "market_cap", "marketCap", "market_cap_usd", "marketCapUsd", "onchain_market_cap", "onchainMarketCap", "on_chain_market_cap", "fdv", "fully_diluted_value", "fullyDilutedValue",
  ]);
  const supply = findAcross(sources, [
    "circulating_supply", "circulatingSupply", "total_supply", "totalSupply", "supply",
  ]);
  const decimals = findAcross(sources, ["decimals"]);
  const holders = findAcross([holdersResult.data, infoResult.data, tokenResult.data], [
    "holder_count", "holders_count", "holderCount", "holdersCount", "total_holders", "totalHolders", "count", "total",
  ]);

  let normalizedSupply = supply;
  if (supply !== null && decimals !== null && decimals > 0 && supply > 1e12) {
    normalizedSupply = supply / Math.pow(10, decimals);
  } else if (supply !== null && supply > 1e15) {
    normalizedSupply = supply / 1e18;
  }

  const marketCap = directMarketCap ?? (price !== null && normalizedSupply !== null ? price * normalizedSupply : null);
  const anySourceAvailable = tokenResult.ok || infoResult.ok || holdersResult.ok;

  return NextResponse.json(
    {
      price,
      marketCap,
      liquidity,
      holders,
      source: "Arcscan",
      updatedAt: new Date().toISOString(),
      available: anySourceAvailable,
      endpoints: {
        token: tokenResult.status,
        info: infoResult.status,
        holders: holdersResult.status,
      },
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
