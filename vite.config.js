import { defineConfig } from 'vite';
export default defineConfig({ base: process.env.GITHUB_ACTIONS ? '/Ten-Tracks/' : './', server: { allowedHosts: ['.e2b.app'] }, preview: { allowedHosts: ['.e2b.app'] } });
