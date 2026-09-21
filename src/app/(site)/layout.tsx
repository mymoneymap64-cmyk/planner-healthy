import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import HBAgencyAdScript from "@/components/HBAgencyAdScript";
import { websiteJsonLd, organizationJsonLd } from "@/lib/seo";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* HBAgency CLS-optimization stylesheet — kept as a normal
          render-blocking <link> intentionally: it exists specifically to
          reserve ad-slot space before HBAgency's own script inserts
          anything, so deferring it would defeat the CLS-prevention
          purpose it's documented for. Scoped to the public site layout
          (not the root layout) so it never loads on the private
          /wellness/[token] dashboard. Next.js hoists this <link> into
          the document <head> automatically. */}
      <link rel="stylesheet" href="https://hbagency.it/cdn/stylehb.css" />
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* HBAgency header-bidding script — rendered once here in the shared
          public-site layout, which stays mounted across client-side
          navigation between public pages, so it loads exactly once and is
          never duplicated. Scoped out of the /wellness/[token] dashboard,
          which uses a separate, minimal layout. */}
      <HBAgencyAdScript />
    </div>
  );
}
