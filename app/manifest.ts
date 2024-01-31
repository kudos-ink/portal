import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.name,
    short_name: "Kudos",
    lang: "en",
    dir: "ltr",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    categories: ["technology", "web3", "polkadot", "open-source", "github"],
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
