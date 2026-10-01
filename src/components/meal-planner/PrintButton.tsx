"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="btn-gold !px-5 !py-2.5 text-sm print:hidden"
    >
      <Printer size={15} /> Print / Save as PDF
    </button>
  );
}
