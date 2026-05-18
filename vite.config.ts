import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      // Remove all console.log / console.error from production build
      // Saves ~5% bundle size and removes debug noise
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },

      // Split the bundle into logical chunks for better caching
      // Each chunk is cached independently - if you update your app code,
      // visitors don't re-download lucide/motion/etc (they're cached)
      rollupOptions: {
        output: {
          manualChunks: {
            // Animation library - changes rarely
            'motion': ['motion/react'],
            // Icon library - changes rarely
            'lucide': ['lucide-react'],
            // React core - never changes
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            // Map libraries - heavy, split out
            'maps': ['react-simple-maps', 'd3-geo', 'topojson-client', 'cobe'],
          },
        },
      },

      // Disable sourcemaps in production (saves 30-40% of build output size)
      sourcemap: false,

      // Warn about large chunks over 600KB
      chunkSizeWarningLimit: 600,
    },

    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
