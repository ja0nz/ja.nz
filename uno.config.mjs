import {
  defineConfig,
  presetIcons,
  transformerDirectives
} from 'unocss';
import { presetWind3 } from "@unocss/preset-wind3";

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

export default defineConfig({
  transformers: [transformerDirectives()],
  presets: [
    presetWind3(),
    presetIcons({
      scale: 1.5,
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
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
  },
  shortcuts: {
    "border-base": "border-gray-200 dark:border-dark-200",
    "bg-base": "bg-white dark:bg-dark-100",
    "color-base": "text-gray-900 dark:text-gray-300",
    "color-fade": "text-gray-900/50 dark:text-gray-300/50", // Note: modern Uno uses / for opacity
    "invert-link": "no-underline hover:underline",
  },
});
