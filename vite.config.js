import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/alpine-demo/",
  build: {
    resolve: {
      alias: {
        $imgs: resolve("./public/"),
      },
    },
    rollupOptions: {
      input: {
        login: resolve(__dirname, "index.html"),
        main: resolve(__dirname, "main.html"),
      },
    },
  },
});
