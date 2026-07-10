import { test, expect, createResultsTracker } from '../../fixtures/basePersistentContext';
import { ProductPage } from '../../pages/product/ProductPage';
import { VendorItemPage } from '../../pages/vendorItem/VendorItemPage';
import { OrderPage } from '../../pages/reconciliation/OrderPage';
import { MenuItemsPage } from '../../pages/recipe/MenuItemsPage';
import { RecipeSetupPage } from '../../pages/recipe/RecipeSetupPage';
import { CountSheet } from '../../pages/inventory&CountSheet/CountSheet';
import { Inventory } from '../../pages/inventory&CountSheet/Inventory';
import { RestaurantUnitPage } from '../../pages/restaurantUnit/RestaurantUnitPage';
import { testNames } from '../../fixtures/testData';

test.describe.configure({ mode: 'serial' });

test.describe('Recipe Test Suite', () => {
  let productPage: ProductPage;
  let vendorItemPage: VendorItemPage;
  let orderPage: OrderPage;
  let menuItemsPage: MenuItemsPage;
  let countSheetPage: CountSheet;
  let inventoryPage: Inventory;
  let restaurantUnitPage: RestaurantUnitPage;
  let recipeSetupPage: RecipeSetupPage;

  const { results, logResults } = createResultsTracker('Recipe Test Suite', [
    // Recipe Type
    'Add Menu Recipe Type',
    // Recipe Methods
    'Add Menu Item With Methods',
    'Verify Recipe Methods',
    'Unsupported Image Format Modal',
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
    // Duplicate Recipe
    'Add Duplicate Recipe Product',
    'Create Duplicate Recipe Source',
    'Create Duplicate Recipe',
    'Verify Duplicate Recipe Name',
    // Cross-Tenant — Duplicate Recipe
    'Switch Tenant To Natick For Duplicate',
    'Verify Duplicate Recipe In Natick',
    'Switch Tenant Back After Duplicate',
  ]);

  test.beforeAll(async ({ persistentPage }) => {
    test.setTimeout(600000);
    productPage = new ProductPage(persistentPage);
    vendorItemPage = new VendorItemPage(persistentPage);
    orderPage = new OrderPage(persistentPage);
    menuItemsPage = new MenuItemsPage(persistentPage);
    countSheetPage = new CountSheet(persistentPage);
    inventoryPage = new Inventory(persistentPage);
    restaurantUnitPage = new RestaurantUnitPage(persistentPage);
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
  // Stage 2: Recipe Methods — Create & Verify
  // ==========================================

  test('Add menu item with 5 method steps and attachments', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.recipe, testNames.recipeTypeMenu, '1', 'case');

    await menuItemsPage.addMultipleMethods([
      { text: 'Step 1: Prepare all ingredients and mise en place', filePath: 'method1.jpg' },
      { text: 'Step 2: Combine dry ingredients and mix thoroughly', filePath: 'method2.jpg' },
      { text: 'Step 3: Add wet ingredients and fold gently', filePath: 'method3.jpg' },
      { text: 'Step 4: Cook at the proper temperature until done', filePath: 'method4.jpg' },
      { text: 'Step 5: Plate and garnish before serving', filePath: 'method5.jpg' },
    ]);

    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRedirectedToMenuItemsList();
    results['Add Menu Item With Methods'] = 'passed';
  });

  test('Verify recipe method steps and images on view page', async () => {
    await menuItemsPage.searchMenuItem(testNames.recipe);
    await menuItemsPage.openMenuItemByName(testNames.recipe);
    await menuItemsPage.verifyMethodSteps([
      'Step 1: Prepare all ingredients and mise en place',
      'Step 2: Combine dry ingredients and mix thoroughly',
      'Step 3: Add wet ingredients and fold gently',
      'Step 4: Cook at the proper temperature until done',
      'Step 5: Plate and garnish before serving',
    ]);
    results['Verify Recipe Methods'] = 'passed';
  });

  test('Verify unsupported image format modal on method upload', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.recipe, testNames.recipeTypeMenu, '1', 'case');
    await menuItemsPage.scrollToMethodSection();
    await menuItemsPage.uploadUnsupportedMethodAttachment(0, 'unsupported.avif');
    results['Unsupported Image Format Modal'] = 'passed';
  });

  // ==========================================
  // Stage 3: Plate Cost — Products & Recipe
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
  // Stage 4: Plate Cost — SubRecipe & Detail Page
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
  // Stage 5: Plate Cost — Update Prices & Verify
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

  // ==========================================
  // Stage 6: Duplicate Recipe — Create & Verify
  // ==========================================

  test('Add product for duplicate recipe with price $10', async () => {
    await productPage.navigateViaLeftNav();
    await productPage.verifyProductsPageLoaded();
    await productPage.clickAddProduct();
    await productPage.enterProductName(testNames.duplicateRecipeProduct);
    await productPage.selectCategory('Cleaning Supplies');
    await productPage.selectUnit('Each');
    await productPage.setProductPrice('10');
    await productPage.clickSave();
    await productPage.verifyProductCreated(testNames.duplicateRecipeProduct);
    results['Add Duplicate Recipe Product'] = 'passed';
  });

  test('Create recipe for duplication', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.openAddMenuItemForm();
    await menuItemsPage.fillMenuItemDetails(testNames.duplicateRecipe, testNames.recipeTypeMenu, '1', 'each');
    await menuItemsPage.addIngredient(testNames.duplicateRecipeProduct, '1', 'each');
    await menuItemsPage.clickSave();
    await menuItemsPage.verifyRedirectedToMenuItemsList();
    results['Create Duplicate Recipe Source'] = 'passed';
  });

  test('Create duplicate recipe via More Options', async () => {
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(testNames.duplicateRecipe);
    await menuItemsPage.openMenuItemByName(testNames.duplicateRecipe);
    await menuItemsPage.clickMoreOptions();
    await menuItemsPage.clickCreateDuplicateRecipe();
    await menuItemsPage.scrollToBottomAndSave();
    results['Create Duplicate Recipe'] = 'passed';
  });

  test('Verify duplicate recipe name on detail page', async ({ persistentPage }) => {
    const duplicateName = `Copy1-${testNames.duplicateRecipe}`;
    await persistentPage.waitForTimeout(2000);
    const nameOnPage = await menuItemsPage.getRecipeDetailName();
    expect(nameOnPage).toContain(duplicateName);
    results['Verify Duplicate Recipe Name'] = 'passed';
  });

  // ==========================================
  // Stage 7: Cross-Tenant — Duplicate Recipe
  // ==========================================

  test('Switch tenant to Wasabi Natick after duplicate', async () => {
    await menuItemsPage.switchTenant('Wasabi Natick');
    results['Switch Tenant To Natick For Duplicate'] = 'passed';
  });

  test('Verify duplicate recipe is listed in Wasabi Natick', async () => {
    const duplicateName = `Copy1-${testNames.duplicateRecipe}`;
    await menuItemsPage.navigateToMenuItems();
    await menuItemsPage.verifyMenuItemsPageLoaded();
    await menuItemsPage.searchMenuItem(duplicateName);
    const row = menuItemsPage['page'].getByRole('row').filter({ hasText: duplicateName }).first();
    await row.waitFor({ state: 'visible', timeout: 15000 });
    await expect(row).toBeVisible();
    results['Verify Duplicate Recipe In Natick'] = 'passed';
  });

  test('Switch tenant back to Wasabi Tysons after duplicate check', async () => {
    await menuItemsPage.switchTenant('Wasabi Tysons');
    results['Switch Tenant Back After Duplicate'] = 'passed';
  });
});
