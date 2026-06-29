import { test as base, chromium, Page, BrowserContext } from '@playwright/test';
import { USER_DATA_DIR } from '../global-setup';
import { config } from '../pages/BasePage';

type PersistentFixtures = {
  persistentContext: BrowserContext;
  persistentPage: Page;
};

/**
 * Helper to get the active page from the context.
 * When Auth0 login replaces the current tab, use this to find the new one.
 */
export async function getActivePage(context: BrowserContext): Promise<Page> {
  const pages = context.pages();
  if (pages.length === 0) {
    return await context.newPage();
  }
  // Return the last opened page (most likely the active one after redirect)
  return pages[pages.length - 1];
}

/**
 * Custom test fixture that provides a persistent browser context and page.
 * Eliminates the duplicated beforeAll/afterAll boilerplate across test files.
 */
export const test = base.extend<{}, PersistentFixtures>({
  persistentContext: [async ({}, use) => {
    const context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      ignoreHTTPSErrors: true,
      args: [
        ...config.browser.args,
        '--password-store=basic',
      ],
      chromiumSandbox: false,
    });
    await use(context);
    await context.close();
  }, { scope: 'worker' }],

  persistentPage: [async ({ persistentContext }, use) => {
    const page = await persistentContext.newPage();
    await use(page);
  }, { scope: 'worker' }],
});

/**
 * Creates a results tracker that logs test stage outcomes in afterAll.
 * Usage:
 *   const { results, logResults } = createResultsTracker('Suite Name', ['Stage 1', 'Stage 2']);
 *   // In tests: results['Stage 1'] = 'passed';
 *   // In afterAll: logResults();
 */
export function createResultsTracker(suiteName: string, stages: string[]) {
  const results: Record<string, string> = {};
  for (const stage of stages) {
    results[stage] = 'failed';
  }

  function logResults() {
    const border = '='.repeat(suiteName.length + 22);
    console.log(`\n${border}`);
    console.log(`========== ${suiteName} Results ==========`);
    for (const [stage, status] of Object.entries(results)) {
      console.log(`  ${stage} - ${status}`);
    }
    console.log(`${border}\n`);
  }

  return { results, logResults };
}

export { expect } from '@playwright/test';
