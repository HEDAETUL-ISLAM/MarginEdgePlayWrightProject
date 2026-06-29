import { test, createResultsTracker } from '../../fixtures/basePersistentContext';
import { RestaurantUnitPage } from '../../pages/restaurantUnit/RestaurantUnitPage';
import { testNames } from '../../fixtures/testData';

test.describe.configure({ mode: 'serial' });

test.describe('Tenant Regression', () => {
  let restaurantUnitPage: RestaurantUnitPage;

  const { results, logResults } = createResultsTracker('Tenant Regression', [
    'Add Tenant',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    restaurantUnitPage = new RestaurantUnitPage(persistentPage);
  });

  test.afterAll(async () => {
    logResults();
  });

  // Stage 1: Add a new tenant
  test('Add new tenant', async () => {
    await restaurantUnitPage.navigateViaLeftNav();
    await restaurantUnitPage.verifyRestaurantUnitsPageLoaded();
    await restaurantUnitPage.clickBulkAddRestaurant();
    await restaurantUnitPage.clickCantFindCompanyLink();
    await restaurantUnitPage.selectConcept('Wasabi');
    await restaurantUnitPage.selectCompany('Mid-States Management Group');
    await restaurantUnitPage.checkCrossUnitReporting();
    await restaurantUnitPage.enterRestaurantUnitName(testNames.tenant);
    await restaurantUnitPage.selectState('Alabama');
    await restaurantUnitPage.enterZipCode('12345');
    await restaurantUnitPage.selectPOS('-- None --');
    await restaurantUnitPage.selectAccounting('-- None --');
    await restaurantUnitPage.enterSubscription('12');
    await restaurantUnitPage.scrollToBottomAndSave();
    await restaurantUnitPage.verifyTenantCreated();
    results['Add Tenant'] = 'passed';
  });
});
