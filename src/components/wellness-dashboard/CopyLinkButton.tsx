"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can be unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <button type="button" onClick={handleCopy} className="btn-secondary py-2 text-sm">
      {copied ? <Check size={15} /> : <Copy size={15} />}
      {copied ? "Copied!" : "Copy My Access Link"}
    </button>
  );
}
