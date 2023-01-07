import { defineConfig } from "astro/config";

import Unocss from "unocss/astro";
import remarkHeadingId from "remark-heading-id";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ja.nz",
  integrations: [
    alpinejs(),
    Unocss({
      presets: [presetUno(), presetIcons()],
      shortcuts: {
        "border-base": "border-gray-200 dark:border-dark-200",
        "bg-base": "bg-white dark:bg-dark-100",
        "color-base": "text-gray-900 dark:text-gray-300",
        "color-fade": "text-gray-900:50 dark:text-gray-300:50",
      },
      rules: [
        ["tile-dark", { "background-image": "url('/bg-tile-dark.png')" }],
        ["tile-light", { "background-image": "url('/bg-tile-light.png')" }],
      ],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId],
  },
});
