/**
 * Verified, publicly accessible YouTube videos used in the homepage
 * "Watch & Learn" section and the /baking-videos page. Every entry here was
 * checked directly against YouTube's own watch-page data before being added
 * (playabilityStatus "OK", not private, title/channel/length read straight
 * from the video itself) — nothing here is invented. All six are from
 * Preppy Kitchen (youtube.com/@PreppyKitchen), John Kanell's long-running,
 * widely followed baking channel, chosen because each one's content
 * genuinely matches its listed topic.
 *
 * `relatedProductSlug` must always be a real slug present in
 * STANDALONE_PRODUCTS (src/data/products.ts) — never invented.
 */

export interface BakingVideo {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  channelUrl: string;
  url: string;
  durationLabel: string;
  category: string;
  description: string;
  relatedProductSlug: string;
}

export const BAKING_VIDEOS: BakingVideo[] = [
  {
    id: "best-vanilla-cake",
    youtubeId: "vG9AZEZ6NyU",
    title: "The BEST Vanilla Cake Recipe",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=vG9AZEZ6NyU",
    durationLabel: "19:40",
    category: "Cake Basics",
    description:
      "A full walkthrough of building a soft, moist vanilla layer cake from scratch — ingredient temperature, mixing order, and bake time all covered.",
    relatedProductSlug: "cake-baking-for-beginners",
  },
  {
    id: "cake-baking-mistakes",
    youtubeId: "bUan5rXIuB4",
    title: "Top 5 Cake Baking Mistakes! | Preppy Kitchen",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=bUan5rXIuB4",
    durationLabel: "5:22",
    category: "Troubleshooting",
    description:
      "A short rundown of the most common cake-baking mistakes — oven temperature, overmixing, and ingredient measuring — and how to fix each one.",
    relatedProductSlug: "cake-baking-for-beginners",
  },
  {
    id: "flat-cake-layers",
    youtubeId: "MNuAMoMgq70",
    title: "How to Get Flat Cake Layers",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=MNuAMoMgq70",
    durationLabel: "9:35",
    category: "Leveling & Layering",
    description:
      "Techniques for baking cake layers that come out flat from the oven, plus how to level and torte any layer that still domes.",
    relatedProductSlug: "cake-decorating-and-frosting-handbook",
  },
  {
    id: "best-buttercream",
    youtubeId: "cTamQu9UlhE",
    title: "The Best Buttercream Frosting Recipe",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=cTamQu9UlhE",
    durationLabel: "12:52",
    category: "Buttercream & Piping",
    description:
      "A complete buttercream tutorial — butter temperature, powdered sugar ratios, and getting a smooth, pipeable consistency every time.",
    relatedProductSlug: "cake-decorating-and-frosting-handbook",
  },
  {
    id: "how-to-decorate-a-cake",
    youtubeId: "xdowDWYurzw",
    title: "How to Decorate a Cake",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=xdowDWYurzw",
    durationLabel: "17:27",
    category: "Decorating",
    description:
      "A start-to-finish decorating walkthrough — crumb coating, smoothing the final layer, and finishing touches for a celebration-ready cake.",
    relatedProductSlug: "celebration-cakes-for-every-occasion",
  },
  {
    id: "easy-cheesecake",
    youtubeId: "tpsywnPNDsw",
    title: "EASY Cheesecake Recipe",
    channel: "Preppy Kitchen",
    channelUrl: "https://www.youtube.com/@PreppyKitchen",
    url: "https://www.youtube.com/watch?v=tpsywnPNDsw",
    durationLabel: "9:31",
    category: "Cheesecake & Desserts",
    description:
      "A straightforward baked cheesecake method, from crust to water-bath-free baking tips, for a creamy result without cracks.",
    relatedProductSlug: "cheesecake-cupcake-mini-cake-cookbook",
  },
];
