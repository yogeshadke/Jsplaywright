
// playwright.config.js (ESM)
// Playwright configuration supporting multiple environments
import { defineConfig } from '@playwright/test';
import qaConfig from './config/staging.config.js';

export default defineConfig({
  ...qaConfig,
  testDir: './tests',
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright'],
  ],
  projects: [
    {
      name: 'Chromium',
      use: { ...qaConfig.use, browserName: 'chromium', slowMo: 2000 },
    },
    {
      name: 'Firefox',
      use: { ...qaConfig.use, browserName: 'firefox', slowMo: 2000 },
    },
    {
      name: 'WebKit',
      use: { ...qaConfig.use, browserName: 'webkit', slowMo: 2000 },
    },
  ],
  fullyParallel: true,
  workers: 4, // Always run tests in parallel with 4 workers
});
