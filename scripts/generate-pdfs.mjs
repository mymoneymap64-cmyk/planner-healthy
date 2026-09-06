#!/usr/bin/env node
/**
 * Regenerates the two sellable PDF products from the live site content:
 *   public/downloads/21-Day-Transformation-Ebook.pdf
 *   public/downloads/21-Day-Transformation-Planner.pdf
 *
 * Writing into public/downloads means Next.js serves them directly at
 * /downloads/21-Day-Transformation-Ebook.pdf — used by the customer
 * download page at /access. A duplicate copy is also kept in pdf/ at the
 * project root for your own records (e.g. uploading to Shopify/Gumroad).
 *
 * These are rendered from src/app/print/ebook and src/app/print/planner,
 * which import directly from src/data/days.ts and src/data/ebook.ts — so
 * editing that content and re-running `npm run generate:pdfs` always
 * produces PDFs that match the current site.
 *
 * Usage:  npm run generate:pdfs
 */

import { spawn } from "node:child_process";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORT = 4478;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.join(ROOT, "public", "downloads");
const ARCHIVE_DIR = path.join(ROOT, "pdf");

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { cwd: ROOT, stdio: "inherit" });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`))
    );
  });
}

async function waitForServer(url, timeoutMs = 60000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      // server not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`);
}

async function generatePdf(page, url, outputPath, label) {
  console.log(`  → Rendering ${label}...`);
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.pdf({
    path: outputPath,
    printBackground: true,
    preferCSSPageSize: true,
  });
  const sizeKb = Math.round(fs.statSync(outputPath).size / 1024);
  console.log(`  ✓ saved ${path.relative(ROOT, outputPath)} (${sizeKb} KB)`);

  const archivePath = path.join(ARCHIVE_DIR, path.basename(outputPath));
  fs.copyFileSync(outputPath, archivePath);
  console.log(`  ✓ archived a copy to ${path.relative(ROOT, archivePath)}`);
}

async function main() {
  const { chromium } = await import("playwright");

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  console.log("→ Building the site (ensures PDFs reflect the latest content)...");
  await run("npx", ["next", "build"]);

  console.log(`→ Starting a temporary production server on port ${PORT}...`);
  const server = spawn("npx", ["next", "start", "-p", String(PORT)], {
    cwd: ROOT,
    stdio: "inherit",
  });

  let exitCode = 0;
  try {
    await waitForServer(`${BASE_URL}/print/ebook`);

    console.log("→ Launching headless Chromium (Playwright)...");
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await generatePdf(
      page,
      `${BASE_URL}/print/ebook`,
      path.join(OUT_DIR, "21-Day-Transformation-Ebook.pdf"),
      "21-Day Transformation Ebook"
    );
    await generatePdf(
      page,
      `${BASE_URL}/print/planner`,
      path.join(OUT_DIR, "21-Day-Transformation-Planner.pdf"),
      "21-Day Transformation Planner"
    );

    await browser.close();
    console.log(`\n✓ Done.`);
    console.log(`  Servable from the website at /downloads/*.pdf  (${OUT_DIR})`);
    console.log(`  Archived copy for your records                (${ARCHIVE_DIR})`);
  } catch (err) {
    console.error("\n✗ PDF generation failed:", err.message);
    exitCode = 1;
  } finally {
    server.kill("SIGTERM");
  }

  process.exit(exitCode);
}

main();
