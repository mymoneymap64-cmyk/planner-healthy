/**
 * Minimal layout for the private /wellness/[token] dashboard. Deliberately
 * bare — no AnnouncementBar/Navbar/Footer and no third-party ad script;
 * those belong to the public marketing site's layout only. DashboardShell
 * (rendered per-page) provides all of this area's own chrome (sidebar,
 * mobile top bar, mobile bottom nav).
 */
export default function WellnessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
