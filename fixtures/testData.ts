import * as fs from 'fs';
import * as path from 'path';

/** Shared test run ID set by global-setup so all test files use the same timestamp. */
function getTestRunId(): string {
  if (process.env.TEST_RUN_ID) return process.env.TEST_RUN_ID;
  const runIdFile = path.join(process.cwd(), '.test-run-id');
  if (fs.existsSync(runIdFile)) return fs.readFileSync(runIdFile, 'utf-8').trim();
  return Date.now().toString();
}

export const TEST_RUN_ID = getTestRunId();

export const testNames = {
  product: `Automated Product ${TEST_RUN_ID}`,
  product2: `Automated Product2 ${TEST_RUN_ID}`,
  vendorItem: `Automated Item ${TEST_RUN_ID}`,
  newVendorItem: `Automated New Item ${TEST_RUN_ID}`,
  recipe: `Automated Recipe ${TEST_RUN_ID}`,
  recipe2: `Automated Recipe2 ${TEST_RUN_ID}`,
  countSheet: `Automated Countsheet ${TEST_RUN_ID}`,
  countSheet2: `Automated Countsheet2 ${TEST_RUN_ID}`,
  product3: `Automated Product3 ${TEST_RUN_ID}`,
  recipe3: `Automated Recipe3 ${TEST_RUN_ID}`,
  countSheet3: `Automated Countsheet3 ${TEST_RUN_ID}`,
  tenant: `Automated Tenant ${TEST_RUN_ID}`,
  recipeTypeMenu: `Menu Type ${TEST_RUN_ID}`,
  recipeTypePrepared: `Prepared Type ${TEST_RUN_ID}`,
  recipeTypeBar: `Bar Type ${TEST_RUN_ID}`,
};
