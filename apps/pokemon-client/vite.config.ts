import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import * as url from "url";

const dirName = url.fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@/src": path.resolve(dirName, "src/"),
    },
  },
});
