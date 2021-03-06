import adapter from "@sveltejs/adapter-cloudflare-workers";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess({
    postcss: true,
  }),

  kit: {
    adapter: adapter(),
    csp: {
      directives: {
        "script-src": ["self", "nonce-theming"],
      },
    },
    prerender: {
      default: true,
    },
  },
};

export default config;
