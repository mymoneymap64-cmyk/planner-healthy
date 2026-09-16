import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Readable } from "stream";
import { getOrderByToken } from "@/lib/orders";
import { isEntitled } from "@/lib/readerAuth";
import { getProduct } from "@/data/products";

export const runtime = "nodejs";

const ASSET_FIELDS = {
  ebook: "ebookPdf",
  planner: "plannerPdf",
  system: "systemPdf",
} as const;

type AssetKey = keyof typeof ASSET_FIELDS;

function isAssetKey(value: string): value is AssetKey {
  return Object.prototype.hasOwnProperty.call(ASSET_FIELDS, value);
}

const CONTENT_ROOT = path.join(process.cwd(), "content");

/**
 * Protected PDF streaming route — the only way any ebook/planner/system
 * file ever reaches a browser. Every request re-validates the token against
 * the real order record and the requested product against that order's
 * entitlement; nothing here is inferred from the client. Never returns a
 * 403 for "wrong product" vs 404 for "no such token/asset" — both look
 * identical so an unauthorized caller can't probe what exists.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string; slug: string; asset: string }> }
) {
  const { token, slug, asset } = await params;

  if (!isAssetKey(asset)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const order = await getOrderByToken(token).catch(() => null);
  if (!order || !isEntitled(order, slug)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const product = getProduct(slug);
  const relativePath = product?.[ASSET_FIELDS[asset]] as string | null | undefined;
  if (!product || !relativePath) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const absolutePath = path.join(CONTENT_ROOT, relativePath);
  if (!absolutePath.startsWith(CONTENT_ROOT + path.sep)) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  let stat: fs.Stats;
  try {
    stat = await fs.promises.stat(absolutePath);
  } catch {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const disposition = request.nextUrl.searchParams.get("download") ? "attachment" : "inline";
  const filename = `${product.slug}-${asset}.pdf`;
  const baseHeaders = {
    "Content-Type": "application/pdf",
    "Accept-Ranges": "bytes",
    "Content-Disposition": `${disposition}; filename="${filename}"`,
    // Never cached by shared/browser caches keyed only on URL — the token
    // in the path is the only thing gating this response.
    "Cache-Control": "private, no-store",
  };

  const range = request.headers.get("range");
  const match = range ? /bytes=(\d*)-(\d*)/.exec(range) : null;

  if (match) {
    const start = match[1] ? parseInt(match[1], 10) : 0;
    const end = match[2] ? parseInt(match[2], 10) : stat.size - 1;

    if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= stat.size) {
      return new NextResponse(null, {
        status: 416,
        headers: { "Content-Range": `bytes */${stat.size}` },
      });
    }

    const webStream = Readable.toWeb(fs.createReadStream(absolutePath, { start, end })) as ReadableStream;

    return new NextResponse(webStream, {
      status: 206,
      headers: {
        ...baseHeaders,
        "Content-Length": String(end - start + 1),
        "Content-Range": `bytes ${start}-${end}/${stat.size}`,
      },
    });
  }

  const webStream = Readable.toWeb(fs.createReadStream(absolutePath)) as ReadableStream;

  return new NextResponse(webStream, {
    status: 200,
    headers: {
      ...baseHeaders,
      "Content-Length": String(stat.size),
    },
  });
}
