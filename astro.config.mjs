import { defineConfig } from "astro/config";

import Unocss from "unocss/astro";
import remarkHeadingId from "remark-heading-id";
import presetIcons from "@unocss/preset-icons";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ja.nz",
  integrations: [Unocss(presetIcons()), alpinejs()],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
