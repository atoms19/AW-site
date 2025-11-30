// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import embeds from "astro-embed/integration"
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [embeds(),mdx(), sitemap()],
 vite: {
    plugins: [tailwindcss()],
  },

});
