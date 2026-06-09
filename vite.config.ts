import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@composables': fileURLToPath(new URL('./src/ui/composables', import.meta.url)),
      '@layouts': fileURLToPath(new URL('./src/ui/layouts', import.meta.url)),
      '@pages': fileURLToPath(new URL('./src/ui/pages', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/ui/stores', import.meta.url)),
      '@api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
    },
  },
})
