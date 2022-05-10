import adapter from "@sveltejs/adapter-cloudflare-workers";
//import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),
    vite: {
      // resolve: {
      //   alias: {
      //     TODO: package.json
      //     path: "path-browserify",
      //   },
      // },
      // optimizeDeps: {
      //   esbuildOptions: {
      //     plugins: [
      //       NodeGlobalsPolyfillPlugin({
      //         buffer: true,
      //       }),
      //     ],
      //   },
      // },
    },

    // Override http methods in the Todo forms
    methodOverride: {
      allowed: ["PATCH", "DELETE"],
    },
  },
};

export default config;
