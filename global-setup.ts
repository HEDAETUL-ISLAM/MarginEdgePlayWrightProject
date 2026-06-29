import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import config from './config/dev.json';

export const USER_DATA_DIR = path.join(process.cwd(), config.browser.userDataDir);

async function globalSetup() {
  // Generate a fresh test run ID for every run to ensure unique entity names.
  const runIdFile = path.join(process.cwd(), '.test-run-id');
  const runId = Date.now().toString();
  fs.writeFileSync(runIdFile, runId);
  process.env.TEST_RUN_ID = runId;

  const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
    headless: true,
    ignoreHTTPSErrors: true,
    args: [...config.browser.args, '--password-store=basic'],
  });

  const page = await context.newPage();

  // Always perform a fresh login — navigate to logout first to clear any stale session
  console.log('[globalSetup] Starting fresh login...');
  await page.goto(`${config.baseUrl}/#/logout`, {
    waitUntil: 'load',
    timeout: config.timeouts.global,
  });
  await page.waitForTimeout(3000);

  // Navigate to login page
  await page.goto(`${config.baseUrl}/`, {
    waitUntil: 'load',
    timeout: config.timeouts.extended,
  });
  await page.waitForTimeout(2000);

  // If already on the app (not redirected to login), force logout
  const currentUrl = page.url();
  if (!currentUrl.includes('/login') && !currentUrl.includes('/auth') && !currentUrl.includes('/signin')) {
    await page.goto(`${config.baseUrl}/#/logout`, {
      waitUntil: 'load',
      timeout: config.timeouts.extended,
    });
    await page.waitForTimeout(3000);
  }

  // Wait for login form to be ready
  await page.locator('input[name="username"]').waitFor({ state: 'visible', timeout: config.timeouts.extended });
  await page.locator('input[name="username"]').fill(config.credentials.username);
  await page.locator('button[type="submit"]').click();
  await page.waitForLoadState('domcontentloaded', { timeout: config.timeouts.long });
  await page.locator('input[type="password"]:visible').waitFor({ state: 'visible', timeout: config.timeouts.long });
  await page.locator('input[type="password"]:visible').fill(config.credentials.password);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(
    (url) => !url.href.includes('/login') && !url.href.includes('/auth') && !url.href.includes('/signin'),
    { timeout: config.timeouts.extended, waitUntil: 'domcontentloaded' }
  );
  console.log('[globalSetup] Login successful — session saved to browser-data/');

  await context.close();
}

export default globalSetup;
