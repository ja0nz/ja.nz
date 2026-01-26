import { defineConfig } from "astro/config";

/* Remark */
import remarkBreaks from "remark-breaks";
import remarkHeadingId from "remark-heading-id";

/* UnoCSS */
import Unocss from "unocss/astro";

/* AlpineJS */
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ja.nz",
  integrations: [
    alpinejs(),
    Unocss({
      injectReset: false,
    }),
  ],
  markdown: {
    remarkPlugins: [remarkHeadingId, remarkBreaks],
    shikiConfig: {
      theme: "monokai",
      wrap: true,
    },
  },
});
