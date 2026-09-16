#!/usr/bin/env node
/**
 * pdfjs-dist ships its worker as an .mjs file. When it's referenced via
 * `new URL(..., import.meta.url)`, Next's production build runs it through
 * Terser as a regular (non-module) script and fails on the worker's own
 * `import`/`export` statements. Copying it into public/ instead means it's
 * served as a static file, untouched by Next's JS bundling/minification —
 * referenced in code as a plain "/pdf.worker.min.mjs" string. Runs
 * automatically via the "postinstall" script so it always matches whatever
 * pdfjs-dist version is installed.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const src = path.join(ROOT, "node_modules", "pdfjs-dist", "build", "pdf.worker.min.mjs");
const dest = path.join(ROOT, "public", "pdf.worker.min.mjs");

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dest);
  console.log("✓ Copied pdf.worker.min.mjs to public/");
} else {
  console.warn("⚠ pdfjs-dist worker file not found at", src, "— skipping copy.");
}
