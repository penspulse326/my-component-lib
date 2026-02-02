import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import vue from '@vitejs/plugin-vue';
import { playwright } from '@vitest/browser-playwright';
// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [vue()],
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        browser: {
          enabled: true,
          headless: true,
          instances: [{
            browser: 'chromium'
          }],
          provider: playwright({})
        },
        name: 'storybook',
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    }]
  }
});