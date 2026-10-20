import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/EII_invitation/' : '/',
  build: {
    outDir: 'dist'
  }
});
