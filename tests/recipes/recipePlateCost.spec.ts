import { test, expect, createResultsTracker } from '../../fixtures/basePersistentContext';
import { ProductPage } from '../../pages/product/ProductPage';
import { MenuItemsPage } from '../../pages/recipe/MenuItemsPage';
import { RecipeSetupPage } from '../../pages/recipe/RecipeSetupPage';
import { testNames } from '../../fixtures/testData';

test.describe.configure({ mode: 'serial' });

test.describe('Recipe Plate Cost', () => {
  let productPage: ProductPage;
  let menuItemsPage: MenuItemsPage;
  let recipeSetupPage: RecipeSetupPage;

  const { results, logResults } = createResultsTracker('Recipe Plate Cost', [
    // Recipe Type
    'Add Menu Recipe Type',
    // Plate Cost — Create & Verify
    'Add Plate Cost Product 1',
    'Add Plate Cost Product 2',
    'Add Plate Cost Recipe',
    'Add Plate Cost Recipe As Ingredient',
    'Verify Plate Cost Detail Page Recipe',
    'Verify Plate Cost Detail Page SubRecipe',
    // Plate Cost — Update & Verify
    'Edit Plate Cost Product 1 Price',
    'Edit Plate Cost Product 2 Price',
    'Verify Updated Plate Cost Recipe',
    'Verify Updated Plate Cost SubRecipe',
    'Verify Updated Plate Cost Detail Page Recipe',
    'Verify Updated Plate Cost Detail Page SubRecipe',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    productPage = new ProductPage(persistentPage);
    menuItemsPage = new MenuItemsPage(persistentPage);
    recipeSetupPage = new RecipeSetupPage(persistentPage);
  });

  test.afterAll(async () => {
    logResults();
  });

  // ==========================================
  // Stage 1: Recipe Type Setup
  // ==========================================

  test('Add Menu recipe type', async () => {
    await recipeSetupPage.navigateToRecipeSetup();
    await recipeSetupPage.clickManageRecipeTypes();
    await recipeSetupPage.addRecipeType(testNames.recipeTypeMenu, 'Menu Items');
    results['Add Menu Recipe Type'] = 'passed';
  });

  // ==========================================
  // Stage 2: Plate Cost — Products & Recipe
  // ==========================================

  test('Add plate cost product 1 with price $10', async () => {
    await productPage.navigateViaLeftNav();
    await productPage.verifyProductsPageLoaded();
    await productPage.clickAddProduct();
    await productPage.enterProductName(testNames.plateCostProduct1);
    await productPage.selectCategory('Cleaning Supplies');
    await productPage.selectUnit('Each');
    await productPage.setProductPrice('10');
    await productPage.clickSave();
    await productPage.verifyProductCreated(testNames.plateCostProduct1);
    results['Add Plate Cost Product 1'] = 'passed';
  });

  test('Add plate cost product 2 with price $15', async () => {
    await productPage.navigateViaLeftNav();
    await productPage.verifyProductsPageLoaded();
    await productPage.clickAddProduct();
    await productPage.enterProductName(testNames.plateCostProduct2);
    await productPage.selectCategory('Cleaning Supplies');
    await productPage.selectUnit('Each');
    await productPage.setProductPrice('15');
    await productPage.clickSave();
    await productPage.verifyProductCreated(testNames.plateCostProduct2);
    results['Add Plate Cost Product 2'] = 'passed';
  });

  test('Create plate cost recipe and verify cost', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.plateCostRecipe, testNames.recipeTypeMenu, '1', 'each');
    await menuItemsPage.addIngredient(testNames.plateCostProduct1, '1', 'each');
    await menuItemsPage.clickAddIngredient();
    await menuItemsPage.addIngredient(testNames.plateCostProduct2, '1', 'each');
    await menuItemsPage.setGlobalMenuPrice('100');
    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRedirectedToMenuItemsList();

    await menuItemsPage.searchMenuItem(testNames.plateCostRecipe);
    const cost = await menuItemsPage.getMenuItemCost(testNames.plateCostRecipe);
    expect(cost).toBe('25.00');

    const row = menuItemsPage['page'].getByRole('row').filter({ hasText: testNames.plateCostRecipe }).first();
    const rowText = await row.textContent();
    expect(rowText).toContain('25.0%');

    results['Add Plate Cost Recipe'] = 'passed';
  });

  // ==========================================
  // Stage 3: Plate Cost — SubRecipe & Detail Page
  // ==========================================

  test('Create recipe using plate cost recipe as ingredient and verify cost', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.plateCostRecipeAsIngredient, testNames.recipeTypeMenu, '1', 'each');
    await menuItemsPage.addIngredient(testNames.plateCostRecipe, '1', 'each');
    await menuItemsPage.setGlobalMenuPrice('100');
    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRedirectedToMenuItemsList();

    await menuItemsPage.searchMenuItem(testNames.plateCostRecipeAsIngredient);
    const cost = await menuItemsPage.getMenuItemCost(testNames.plateCostRecipeAsIngredient);
    expect(cost).toBe('25.00');

    const row = menuItemsPage['page'].getByRole('row').filter({ hasText: testNames.plateCostRecipeAsIngredient }).first();
    const rowText = await row.textContent();
    expect(rowText).toContain('25.0%');

    results['Add Plate Cost Recipe As Ingredient'] = 'passed';
  });

  test('Verify plate cost on detail page for plate cost recipe', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipe);
    await menuItemsPage.openMenuItemByName(testNames.plateCostRecipe);
    const plateCost = await menuItemsPage.getDetailPagePlateCost();
    expect(plateCost).toBe('25');
    results['Verify Plate Cost Detail Page Recipe'] = 'passed';
  });

  test('Verify plate cost on detail page for sub-recipe', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipeAsIngredient);
    await menuItemsPage.openMenuItemByName(testNames.plateCostRecipeAsIngredient);
    const plateCost = await menuItemsPage.getDetailPagePlateCost();
    expect(plateCost).toBe('25');
    results['Verify Plate Cost Detail Page SubRecipe'] = 'passed';
  });

  // ==========================================
  // Stage 4: Plate Cost — Update Prices & Verify
  // ==========================================

  test('Edit plate cost product 1 price from $10 to $20', async () => {
    await productPage.navigateViaLeftNav();
    await productPage.verifyProductsPageLoaded();
    await productPage.searchProduct(testNames.plateCostProduct1);
    await productPage.openProductByName(testNames.plateCostProduct1);
    await productPage.clickEditProduct();
    await productPage.editUsedProductPrice('20');
    await productPage.scrollToBottomAndSave();
    results['Edit Plate Cost Product 1 Price'] = 'passed';
  });

  test('Edit plate cost product 2 price from $15 to $30', async () => {
    await productPage.navigateViaLeftNav();
    await productPage.verifyProductsPageLoaded();
    await productPage.searchProduct(testNames.plateCostProduct2);
    await productPage.openProductByName(testNames.plateCostProduct2);
    await productPage.clickEditProduct();
    await productPage.editUsedProductPrice('30');
    await productPage.scrollToBottomAndSave();
    results['Edit Plate Cost Product 2 Price'] = 'passed';
  });

  test('Verify updated plate cost for recipe after price change', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipe);
    const cost = await menuItemsPage.getMenuItemCost(testNames.plateCostRecipe);
    expect(cost).toBe('50.00');

    const row = menuItemsPage['page'].getByRole('row').filter({ hasText: testNames.plateCostRecipe }).first();
    const rowText = await row.textContent();
    expect(rowText).toContain('50.0%');

    results['Verify Updated Plate Cost Recipe'] = 'passed';
  });

  test('Verify updated plate cost for sub-recipe after price change', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipeAsIngredient);
    const cost = await menuItemsPage.getMenuItemCost(testNames.plateCostRecipeAsIngredient);
    expect(cost).toBe('50.00');

    const row = menuItemsPage['page'].getByRole('row').filter({ hasText: testNames.plateCostRecipeAsIngredient }).first();
    const rowText = await row.textContent();
    expect(rowText).toContain('50.0%');

    results['Verify Updated Plate Cost SubRecipe'] = 'passed';
  });

  test('Verify updated plate cost on detail page for recipe', async ({ persistentPage }) => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipe);
    await menuItemsPage.openMenuItemByName(testNames.plateCostRecipe);
    await persistentPage.waitForTimeout(2000);
    const plateCost = await menuItemsPage.getDetailPagePlateCost();
    expect(plateCost).toBe('50');
    results['Verify Updated Plate Cost Detail Page Recipe'] = 'passed';
  });

  test('Verify updated plate cost on detail page for sub-recipe', async ({ persistentPage }) => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.plateCostRecipeAsIngredient);
    await menuItemsPage.openMenuItemByName(testNames.plateCostRecipeAsIngredient);
    await persistentPage.waitForTimeout(2000);
    const plateCost = await menuItemsPage.getDetailPagePlateCost();
    expect(plateCost).toBe('50');
    results['Verify Updated Plate Cost Detail Page SubRecipe'] = 'passed';
  });
});
