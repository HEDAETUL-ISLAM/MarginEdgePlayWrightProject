import { test, createResultsTracker } from '../../fixtures/basePersistentContext';
import { CentralVendorPage } from '../../pages/vendor/CentralVendorPage';

test.describe.configure({ mode: 'serial' });

test.describe('EDI Invoices', () => {
  let centralVendorPage: CentralVendorPage;

  const { results, logResults } = createResultsTracker('EDI Invoices', [
    'Setup EDI Vendor Format',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    centralVendorPage = new CentralVendorPage(persistentPage);
  });

  test.afterAll(async () => {
    logResults();
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        EDI Vendor Setup                               ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Navigate to Central Vendors', async () => {
    await centralVendorPage.navigateToCentralVendors();
  });

  test('Search and open central vendor JFC', async () => {
    await centralVendorPage.searchCentralVendor('JFC');
    await centralVendorPage.openCentralVendorRow();
  });

  test('Setup EDI vendor format', async () => {
    const hasEdiRow = await centralVendorPage.hasCentralVendorEdiFormatRow('marginedge.com');

    if (!hasEdiRow) {
      await centralVendorPage.addCentralVendorInboundEdiFormat('marginedge.com');
    }

    await centralVendorPage.scrollToBottomAndSaveCentralVendor();
    results['Setup EDI Vendor Format'] = 'passed';
  });
});
