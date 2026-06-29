import { test, createResultsTracker } from '../../fixtures/basePersistentContext';
import { MenuItemsPage } from '../../pages/recipe/MenuItemsPage';
import { testNames } from '../../fixtures/testData';

test.describe.configure({ mode: 'serial' });

test.describe('Recipe Regression', () => {
  let menuItemsPage: MenuItemsPage;

  const { results, logResults } = createResultsTracker('Recipe Regression', [
    'Add Menu Item',
    'Edit Menu Item',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    menuItemsPage = new MenuItemsPage(persistentPage);
  });

  test.afterAll(async () => {
    logResults();
  });

  // Stage 1: Add a new menu item and verify redirect
  test('Add new menu item', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.recipe, 'test', '1', 'case');
    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRedirectedToMenuItemsList();
    results['Add Menu Item'] = 'passed';
  });

  // Stage 2: Open menu item, edit recipe, add ingredient, save
  test('Edit menu item - add ingredient', async () => {
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openMenuItemByName(testNames.recipe);
    await menuItemsPage.openEditRecipeForm();
    await menuItemsPage.addIngredient(testNames.product, '1', 'case');
    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRecipeDetailPageLoaded();
    results['Edit Menu Item'] = 'passed';
  });
});
