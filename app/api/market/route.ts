import { NextResponse } from "next/server";
import { tokenConfig } from "@/lib/config";

export const dynamic = "force-dynamic";

function numberFrom(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[$,]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function deepFind(obj: unknown, keys: string[]): number | null {
  if (!obj || typeof obj !== "object") return null;
  const record = obj as Record<string, unknown>;
  for (const key of keys) {
    if (key in record) {
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
  const response = await fetch(url, {
    cache: "no-store",
    headers: { accept: "application/json" },
  });
  if (!response.ok) return null;
  return response.json();
}

export async function GET() {
  const address = tokenConfig.contract;
  const tokenUrl = `https://api.arc-scan.org/v1/tokens/${address}`;
  const holdersUrl = `https://api.arc-scan.org/v1/tokens/${address}/holders?limit=1`;

  try {
    const [tokenJson, holdersJson] = await Promise.all([
      getJson(tokenUrl),
      getJson(holdersUrl),
    ]);

    const price = deepFind(tokenJson, [
      "price_usd", "priceUsd", "usd_price", "price", "spot_price", "usdPrice",
    ]);
    const liquidity = deepFind(tokenJson, [
      "liquidity_usd", "liquidityUsd", "pool_depth_usd", "poolDepthUsd", "depth_usd", "depthUsd", "depth", "liquidity",
    ]);
    const supply = deepFind(tokenJson, [
      "circulating_supply", "circulatingSupply", "total_supply", "totalSupply", "supply",
    ]);
    const directMarketCap = deepFind(tokenJson, [
      "market_cap", "marketCap", "market_cap_usd", "marketCapUsd", "onchain_market_cap", "onchainMarketCap",
    ]);
    const holders = deepFind(holdersJson, [
      "holder_count", "holders_count", "holderCount", "holders", "total", "count",
    ]) ?? deepFind(tokenJson, [
      "holder_count", "holders_count", "holderCount", "holders", "holdersCount",
    ]);

    const normalizedSupply = supply !== null && supply > 1e15 ? supply / 1e18 : supply;
    const marketCap = directMarketCap ?? (price !== null && normalizedSupply !== null ? price * normalizedSupply : null);

    return NextResponse.json(
      {
        price,
        marketCap,
        liquidity,
        holders,
        source: "Arcscan",
        updatedAt: new Date().toISOString(),
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch {
    return NextResponse.json(
      { price: null, marketCap: null, liquidity: null, holders: null, source: "Arcscan", updatedAt: null },
      { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  }
}
