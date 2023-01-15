import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: "static/",
  // publicDir: "/static/src/vue/dist/", // Should be STATIC_URL + path/to/build
  build: {
    /* eslint-disable no-undef */
    outDir: path.resolve(__dirname, "../static/src/vue/dist/"), // Output to a directory in STATICFILES_DIRS
    /* eslint-enable no-undef */

    // like devMiddlewere.writeToDisk = true
    manifest: true,
    // Django will hash file names, not webpack
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});
