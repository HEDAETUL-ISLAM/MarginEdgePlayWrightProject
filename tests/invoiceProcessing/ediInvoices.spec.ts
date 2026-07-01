import { test, createResultsTracker } from '../../fixtures/basePersistentContext';
import { LogInOutPage } from '../../pages/LogInOutPage';
import { CentralVendorPage } from '../../pages/vendor/CentralVendorPage';
import { VendorPage } from '../../pages/vendor/VendorPage';
import { config } from '../../pages/BasePage';
import { IntegrationsPage } from '../../pages/integrations/IntegrationsPage';
import { TeamAssignmentsPage } from '../../pages/users/TeamAssignmentsPage';
import { UserPage } from '../../pages/users/UserPage';
import { VendorItemPage } from '../../pages/vendorItem/VendorItemPage';
import { OrderPage } from '../../pages/reconciliation/OrderPage';
import { PriorityReportPage } from '../../pages/reconciliation/PriorityReportPage';
import { testNames } from '../../fixtures/testData';
import * as path from 'path';

test.describe.configure({ mode: 'serial' });

test.describe('EDI Invoices', () => {
  let loginPage: LogInOutPage;
  let centralVendorPage: CentralVendorPage;
  let vendorPage: VendorPage;
  let integrationsPage: IntegrationsPage;
  let teamAssignmentsPage: TeamAssignmentsPage;
  let userPage: UserPage;
  let vendorItemPage: VendorItemPage;
  let orderPage: OrderPage;
  let priorityReportPage: PriorityReportPage;

  const { results, logResults } = createResultsTracker('EDI Invoices', [
    'Assign Lead Analyst to The Analyst',
    'Assign Lead Analyst to Second Analyst',
    'Set Office for Analyst 1',
    'Set Office for Analyst 2',
    'Set Office for Analyst 3',
    'Central Vendor EDI Config',
    'Local Vendor EDI Config',
    'Reconciliation',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    loginPage = new LogInOutPage(persistentPage);
    centralVendorPage = new CentralVendorPage(persistentPage);
    vendorPage = new VendorPage(persistentPage);
    integrationsPage = new IntegrationsPage(persistentPage);
    teamAssignmentsPage = new TeamAssignmentsPage(persistentPage);
    userPage = new UserPage(persistentPage);
    vendorItemPage = new VendorItemPage(persistentPage);
    orderPage = new OrderPage(persistentPage);
    priorityReportPage = new PriorityReportPage(persistentPage);
  });

  test.afterAll(async () => {
    logResults();
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        Team Assignments                               ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Navigate to Team Assignments', async () => {
    await teamAssignmentsPage.navigateToUsersViaLeftNav();
    await teamAssignmentsPage.clickTeamAssignments();
  });

  test('Assign Lead Analyst to The Analyst', async () => {
    await teamAssignmentsPage.searchAnalyst('The Analyst');
    await teamAssignmentsPage.selectLeadAnalystFromDropdown();
    await teamAssignmentsPage.clickSaveChanges();
    results['Assign Lead Analyst to The Analyst'] = 'passed';
  });

  test('Assign Lead Analyst to Second Analyst', async () => {
    await teamAssignmentsPage.clearSearch();
    await teamAssignmentsPage.searchAnalyst('Second Analyst');
    await teamAssignmentsPage.selectLeadAnalystFromDropdown();
    await teamAssignmentsPage.clickSaveChanges();
    results['Assign Lead Analyst to Second Analyst'] = 'passed';
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        User Office Setup                              ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Set office to Dhaka for first analyst', async () => {
    await userPage.navigateToSetupUsersViaLeftNav();
    await userPage.selectMarginEdgeStaff();
    await userPage.searchUser('Analyst');
    await userPage.openUserRow(1);
    await userPage.selectOffice('Dhaka');
    await userPage.scrollToBottomAndSave();
    results['Set Office for Analyst 1'] = 'passed';
  });

  test('Set office to Dhaka for second analyst', async () => {
    await userPage.selectMarginEdgeStaff();
    await userPage.searchUser('Analyst');
    await userPage.openUserRow(2);
    await userPage.selectOffice('Dhaka');
    await userPage.scrollToBottomAndSave();
    results['Set Office for Analyst 2'] = 'passed';
  });

  test('Set office to Dhaka for third analyst', async () => {
    await userPage.selectMarginEdgeStaff();
    await userPage.searchUser('Analyst');
    await userPage.openUserRow(3);
    await userPage.selectOffice('Dhaka');
    await userPage.scrollToBottomAndSave();
    results['Set Office for Analyst 3'] = 'passed';
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                     Central Vendor EDI Config                         ║
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
    results['Central Vendor EDI Config'] = 'passed';
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                      Local Vendor EDI Config                          ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Navigate to Vendors', async () => {
    await vendorPage.navigateToVendors();
  });

  test('Search and open vendor JFC', async () => {
    await vendorPage.searchVendor('JFC');
    await vendorPage.clickVendorSearchResult('JFC');
  });

  test('Edit vendor with EDI configuration', async () => {
    await vendorPage.clickEditVendor();
    await vendorPage.enterVendorAccountNumber('99999');
    await vendorPage.selectEdiMode('EDI-first Processing');
    await vendorPage.clickSave();
    results['Local Vendor EDI Config'] = 'passed';
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        Re-login as Developer                          ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Logout as accountmanager', async () => {
    await loginPage.logout();
  });

  test('Login as developer', async () => {
    await loginPage.login('developer', config.credentials.password);
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        Throw Mock Event                               ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Navigate to Integrations', async () => {
    await integrationsPage.navigateToIntegrations();
  });

  test('Submit Mock SQS Event', async () => {
    const mockEventPath = path.resolve(__dirname, '../../fixtures/files/mockSqsEvent.json');
    await integrationsPage.selectQueueSuffix('inboundemail-marginedge-com');
    await integrationsPage.fillMockSqsPacket(mockEventPath);
    await integrationsPage.clickSend();
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                    Vendor Item Packaging Ratio Fix                    ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Navigate to Vendor Items', async () => {
    await vendorItemPage.navigateViaLeftNav();
  });

  test('Search and open vendor item', async () => {
    await vendorItemPage.searchVendorItem('AJINO FS SHRIMP SHUMAI 50PC 6/1.76 #');
    await vendorItemPage.clickVendorItemSearchResult('AJINO FS SHRIMP SHUMAI 50PC 6/1.76 #');
  });

  test('Edit vendor item and fix packaging ratio', async () => {
    await vendorItemPage.clickEditVendorItem();
    const wasZero = await vendorItemPage.checkAndFixPackagingRatio('11');
    if (wasZero) {
      await vendorItemPage.scrollToBottomAndSave();
    }
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                        Re-login as Analyst2                           ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Logout as developer', async () => {
    await loginPage.logout();
  });

  test('Login as analyst2', async () => {
    await loginPage.login('analyst2', config.credentials.password);
  });

  // ╔═════════════════════════════════════════════════════════════════════════╗
  // ║                          Reconciliation                               ║
  // ╚═════════════════════════════════════════════════════════════════════════╝

  test('Verify EDI invoice status is In Reconciliation', async () => {
    await orderPage.navigateToOrdersList();
    await orderPage.searchOrderInList('IMPORTED2');
    const statusCell = orderPage['page'].getByRole('cell', { name: /in reconciliation/i }).first();
    await statusCell.waitFor({ state: 'visible', timeout: 15000 });
  });

  test('Start reconciliation', async () => {
    await priorityReportPage.navigateToPriorityReport();
    await priorityReportPage.startReconciliation();
  });

  test('Complete reconciliation', async () => {
    await orderPage.setHandwritingToNo();
    await orderPage.markReconciliationComplete();
    await orderPage.saveAndCompleteReconciliation();
    await orderPage.clickVerifiedInModal();
    results['Reconciliation'] = 'passed';
  });
});
