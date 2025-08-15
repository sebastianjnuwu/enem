// @ts-check
import { 
  defineConfig
} from "astro/config";
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: "static",
  outDir: "build",
  server: {
    port: 8080
  },
  devToolbar: {
    enabled: false
  },
  integrations: [react(), sitemap()],
});