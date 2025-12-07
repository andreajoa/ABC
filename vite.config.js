import {vitePlugin as remix} from '@remix-run/dev';
import {vercelPreset} from '@vercel/remix/vite';
import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
      serverModuleFormat: 'esm',
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
});

