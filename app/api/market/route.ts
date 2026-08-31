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
      headers: { accept: "application/json", "user-agent": "Mozilla/5.0 beancat-market/1.0" },
    });
    if (!response.ok) return { ok: false, status: response.status, data: null as unknown };
    return { ok: true, status: response.status, data: await response.json() as unknown };
  } catch {
    return { ok: false, status: 0, data: null as unknown };
  }
}

async function getText(url: string) {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        accept: "text/html,application/xhtml+xml",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131 Safari/537.36",
      },
    });
    if (!response.ok) return { ok: false, status: response.status, text: "" };
    return { ok: true, status: response.status, text: await response.text() };
  } catch {
    return { ok: false, status: 0, text: "" };
  }
}

function findAcross(sources: unknown[], keys: string[]) {
  for (const source of sources) {
    const result = deepFind(source, keys);
    if (result !== null) return result;
  }
  return null;
}

function htmlToText(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&dollar;|&#36;/gi, "$")
    .replace(/&#x24;/gi, "$")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDollarAfter(text: string, label: RegExp, windowSize = 420): number | null {
  const match = label.exec(text);
  if (!match || match.index === undefined) return null;
  const window = text.slice(match.index + match[0].length, match.index + match[0].length + windowSize);
  const dollar = window.match(/\$\s*([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?(?:e[+-]?\d+)?)/i);
  return dollar ? numberFrom(dollar[1]) : null;
}

function parseHolders(text: string): number | null {
  const match = /\bHolders\b/i.exec(text);
  if (!match || match.index === undefined) return null;
  const window = text.slice(match.index + match[0].length, match.index + match[0].length + 180);
  const amount = window.match(/([0-9]+(?:,[0-9]{3})*)/);
  return amount ? numberFrom(amount[1]) : null;
}

function parseTokenPage(html: string) {
  if (!html) return { price: null, marketCap: null, liquidity: null, holders: null };
  const text = htmlToText(html);

  const price = parseDollarAfter(text, /\bPrice\b/i, 260);
  const marketCap = parseDollarAfter(text, /\bOn\s*chain\s+Market\s+Cap\b|\bOnchain\s+Market\s+Cap\b|\bMarket\s+Cap\b/i, 300);

  const depthMatch = text.match(/\bdepth\s*\$\s*([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?)/i);
  const liquidityLabel = parseDollarAfter(text, /\bLiquidity\b|\bPool\s+Depth\b/i, 260);
  const liquidity = depthMatch ? numberFrom(depthMatch[1]) : liquidityLabel;
  const holders = parseHolders(text);

  return { price, marketCap, liquidity, holders };
}

export async function GET() {
  const address = tokenConfig.contract.toLowerCase();
  const base = `https://api.arc-scan.org/v1/tokens/${address}`;

  const [tokenResult, infoResult, holdersResult, pageIo, pageOrg] = await Promise.all([
    getJson(base),
    getJson(`${base}/info`),
    getJson(`${base}/holders?limit=1`),
    getText(`https://arc-scan.io/token/${address}`),
    getText(`https://arc-scan.org/token/${address}`),
  ]);

  const sources = [infoResult.data, tokenResult.data, holdersResult.data];
  const parsedPage = parseTokenPage(pageIo.text || pageOrg.text);

  const apiPrice = findAcross(sources, ["price_usd", "priceUsd", "usd_price", "usdPrice", "price", "spot_price", "spotPrice", "token_price", "tokenPrice"]);
  const apiLiquidity = findAcross(sources, ["liquidity_usd", "liquidityUsd", "total_liquidity_usd", "totalLiquidityUsd", "pool_depth_usd", "poolDepthUsd", "depth_usd", "depthUsd", "pool_depth", "poolDepth", "liquidity"]);
  const apiMarketCap = findAcross(sources, ["market_cap", "marketCap", "market_cap_usd", "marketCapUsd", "onchain_market_cap", "onchainMarketCap", "on_chain_market_cap", "fdv", "fully_diluted_value", "fullyDilutedValue"]);
  const supply = findAcross(sources, ["circulating_supply", "circulatingSupply", "total_supply", "totalSupply", "supply"]);
  const decimals = findAcross(sources, ["decimals"]);
  const apiHolders = findAcross([holdersResult.data, infoResult.data, tokenResult.data], ["holder_count", "holders_count", "holderCount", "holdersCount", "total_holders", "totalHolders", "count", "total"]);

  const price = apiPrice ?? parsedPage.price;
  const liquidity = apiLiquidity ?? parsedPage.liquidity;
  const holders = apiHolders ?? parsedPage.holders;

  let normalizedSupply = supply;
  if (supply !== null && decimals !== null && decimals > 0 && supply > 1e12) normalizedSupply = supply / Math.pow(10, decimals);
  else if (supply !== null && supply > 1e15) normalizedSupply = supply / 1e18;

  const marketCap = apiMarketCap ?? parsedPage.marketCap ?? (price !== null && normalizedSupply !== null ? price * normalizedSupply : null);
  const pageWorked = parsedPage.price !== null || parsedPage.marketCap !== null || parsedPage.liquidity !== null || parsedPage.holders !== null;

  return NextResponse.json(
    {
      price,
      marketCap,
      liquidity,
      holders,
      source: pageWorked ? "Arcscan market page" : "Arcscan API",
      updatedAt: new Date().toISOString(),
      available: price !== null || marketCap !== null || liquidity !== null || holders !== null,
      diagnostics: {
        api: { token: tokenResult.status, info: infoResult.status, holders: holdersResult.status },
        page: { io: pageIo.status, org: pageOrg.status, parsed: parsedPage },
      },
    },
    { status: 200, headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}
