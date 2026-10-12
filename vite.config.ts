import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL?.replace(/\/$/, '');
  if (siteUrl && !/^https:\/\/[^\s<>"']+$/.test(siteUrl)) throw new Error('VITE_SITE_URL must be an absolute HTTPS URL.');
  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), {
      name: 'dada-metadata',
      transformIndexHtml(html) {
        return html.replace('<!-- SITE_METADATA -->', siteUrl ? `<link rel="canonical" href="${siteUrl}/" /><meta property="og:url" content="${siteUrl}/" /><meta property="og:image" content="${siteUrl}/assets/mascot/dada-neon-pointing.png" />` : '');
      },
      generateBundle() {
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ''}` });
        if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${siteUrl.replaceAll('&', '&amp;')}/</loc></url></urlset>` });
      },
    }],
  };
});
