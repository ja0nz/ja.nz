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
          // rethrow errors from any other transformer/url
          throw error;
        case url.includes("twitter.com"):
          return `<p style="color:red">ERROR: Unable to embed <a href="${url}">this tweet</a> (possibly deleted).</p>`;
        default:
          // TODO: more specific error handling
          return `<a href="${url}">${url}</a>`;
      }
    },
  },
];

const utopia = {
  "5-": "var(--step--5)",
  "4-": "var(--step--4)",
  "3-": "var(--step--3)",
  "2-": "var(--step--2)",
  "1-": "var(--step--1)",
  0: "var(--step-0)",
  1: "var(--step-1)",
  2: "var(--step-2)",
  3: "var(--step-3)",
  4: "var(--step-4)",
  5: "var(--step-5)",
};
const theme = {
  colors: {
    light: "var(--color-light)",
    lightaccent: "var(--color-light-accent)",
    dark: "var(--color-dark)",
    darkaccent: "var(--color-dark-accent)",
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    lightgrey: "var(--color-light-grey)",
    darkgrey: "var(--color-dark-grey)",
  },
  spacing: utopia,
  fontSize: utopia,
  fontFamily: {
    sans: ["Inter", "sans-serif"],
    mono: ["monospace"],
    head: ["Cartridge Regular"],
  },
};

/* UnoCSS */
import Unocss from "unocss/astro";
import presetIcons from "@unocss/preset-icons";
import presetUno from "@unocss/preset-uno";
import transformerDirectives from "@unocss/transformer-directives";

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
      injectReset: false,
      transformers: [transformerDirectives()],
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
      theme,
      shortcuts: {
        "border-base": "border-gray-200 dark:border-dark-200",
        "bg-base": "bg-white dark:bg-dark-100",
        "color-base": "text-gray-900 dark:text-gray-300",
        "color-fade": "text-gray-900:50 dark:text-gray-300:50",
        "invert-link": "no-underline hover:underline",
      },
      rules: [],
    }),
  ],
  markdown: {
    remarkPlugins: [remarkEmbedPlugin, remarkHeadingId, remarkBreaks],
    shikiConfig: {
      theme: "monokai",
      wrap: true,
    },
  },
});
