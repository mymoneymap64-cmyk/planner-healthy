"use client";

import Script from "next/script";

/**
 * Loads the HBAgency header-bidding script. If it fails to load (e.g. a
 * DNS/CDN outage on the vendor's side), marks <body> so ad slots defined
 * by .hb-ad-inpage collapse instead of showing an empty placeholder box.
 */
export default function HBAgencyAdScript() {
  return (
    <Script
      src="https://d3u598arehtfkf.cloudfront.net/prebid_hb_39870_43777.js"
      strategy="afterInteractive"
      onError={() => {
        document.body.classList.add("hb-ad-failed");
      }}
    />
  );
}
