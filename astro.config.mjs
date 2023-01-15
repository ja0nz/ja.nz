import { defineConfig } from "astro/config";

/* Remark */
import remarkBreaks from "remark-breaks";
import remarkHeadingId from "remark-heading-id";
import remarkEmbedder from "@remark-embedder/core";
import oembedTransformer from "@remark-embedder/transformer-oembed";

const remarkEmbedPlugin = [
  remarkEmbedder.default,
  {
    transformers: [oembedTransformer.default],
    // https://github.com/remark-embedder/transformer-oembed/issues/25#issuecomment-888613740
    // https://github.com/remark-embedder/core#handleerror-errorinfo-errorinfo--gottenhtml--promisegottenhtml
    handleError({ error, url, transformer }) {
      switch (true) {
        case transformer.name !== "@remark-embedder/transformer-oembed":
          throw error;
        case url.includes("twitter.com"):
          return `<p style="color:red">ERROR: Unable to embed <a href="${url}">this tweet</a> (possibly deleted).</p>`;
        default:
          // we're only handling errors from this specific transformer and the twitter URL
          // so we'll rethrow errors from any other transformer/url
          throw error;
      }
    },
  },
];

/* UnoCSS */
import Unocss from "unocss/astro";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";

/* AlpineJS */
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
  site: "https://ja.nz",
  vite: {
    server: {
      watch: {
        ignored: ["**/.devenv**"],
      },
    },
  },
  integrations: [
    alpinejs(),
    Unocss({
      presets: [
        presetUno(),
        presetIcons({
          scale: 1.5,
          extraProperties: {
            display: "inline-block",
            "vertical-align": "middle",
          },
        }),
      ],
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
    remarkPlugins: [remarkEmbedPlugin, remarkHeadingId, remarkBreaks],
  },
});
