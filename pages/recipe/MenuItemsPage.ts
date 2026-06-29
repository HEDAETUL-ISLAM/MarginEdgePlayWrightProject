import { Page, Locator, expect } from '@playwright/test';
import { BasePage, TIMEOUT } from '../BasePage';

export class MenuItemsPage extends BasePage {
  private readonly recipesNavLink: Locator;
  private readonly menuItemsLink: Locator;
  readonly heading: Locator;
  private readonly addMenuItemLink: Locator;
  private readonly nameInput: Locator;
  private readonly typeInput: Locator;
  private readonly quantityInput: Locator;
  private readonly unitInput: Locator;
  private readonly saveButton: Locator;
  private readonly editRecipeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.recipesNavLink = page.getByText('Recipes', { exact: true }).first();
    this.menuItemsLink = page.getByRole('button', { name: /menu items/i }).first();
    this.heading = page.getByRole('heading', { name: /menu items/i });
    this.addMenuItemLink = page.getByRole('link', { name: 'Add Menu Item' });
    this.nameInput = page.getByPlaceholder('Name', { exact: true });
    this.typeInput = page.getByPlaceholder('Select a Recipe Type...');
    this.quantityInput = page.getByRole('spinbutton', { name: 'Quantity' });
    this.unitInput = page.getByPlaceholder('Select unit');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.editRecipeButton = page.getByRole('button', { name: /edit recipe/i });
  }

  async navigateToMenuItems() {
    await this.navigateTo(this.baseUrl, TIMEOUT.long);
    await this.recipesNavLink.waitFor({ state: 'visible', timeout: TIMEOUT.long });
    await this.recipesNavLink.click();
    await this.menuItemsLink.waitFor({ state: 'visible', timeout: TIMEOUT.long });
    await this.menuItemsLink.click();
    await this.waitForPageLoad();
  }

  async verifyMenuItemsPageLoaded() {
    await expect(this.page).toHaveURL(/menu.item|menuitem|menu_item/i);
    await expect(this.heading).toBeVisible({ timeout: TIMEOUT.default });
  }

  async openAddMenuItemForm() {
    await this.addMenuItemLink.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.addMenuItemLink.click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUT.long });
  }

  async fillMenuItemDetails(name: string, type: string, quantity: string, unit: string) {
    await this.nameInput.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.nameInput.fill(name);

    await this.typeInput.click();
    await this.typeInput.fill(type);
    await this.page.getByRole('option', { name: new RegExp(`^${type}$`, 'i') }).first().click();
    await this.page.waitForTimeout(500);

    await this.quantityInput.fill(quantity);

    await this.unitInput.click();
    await this.unitInput.fill(unit);
    await this.page.getByRole('option', { name: new RegExp(unit, 'i') }).first().click();
    await this.page.waitForTimeout(500);
  }

  async clickSave() {
    await this.saveButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUT.long });
  }

  async verifyRedirectedToMenuItemsList() {
    await expect(this.page).toHaveURL(/#\/menuItem$/, { timeout: TIMEOUT.long });
    await expect(this.page).toHaveTitle('Menu Items', { timeout: TIMEOUT.default });
    await expect(this.heading).toBeVisible({ timeout: TIMEOUT.default });
  }

  async openMenuItemByName(name: string) {
    const cell = this.page.getByRole('cell', { name });
    await cell.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await cell.click();
    await this.page.waitForURL(/\/recipe\/\d+/, { timeout: TIMEOUT.long });
    await this.waitForPageLoad();
  }

  async openEditRecipeForm() {
    await this.editRecipeButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.editRecipeButton.click();
    await this.page.waitForURL(/\/recipe\/\d+\/edit/, { timeout: TIMEOUT.long });
    await this.waitForPageLoad();
  }

  async addIngredient(item: string, quantity: string, unit: string) {
    const itemInput = this.page.getByPlaceholder('Type to see options').first();
    await itemInput.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await itemInput.click();
    await itemInput.fill(item);
    await this.page.getByRole('option', { name: item }).first().click();
    await this.page.waitForTimeout(500);

    const ingredientRow = this.page.getByRole('row').filter({ has: this.page.getByPlaceholder('Type to see options') });
    await ingredientRow.getByRole('textbox', { name: 'Quantity' }).fill(quantity);

    const unitInput = ingredientRow.getByPlaceholder('Unit');
    await unitInput.click();
    await unitInput.fill(unit);
    await this.page.getByRole('option', { name: new RegExp(unit, 'i') }).first().click();
    await this.page.waitForTimeout(500);

    // Handle conversion modal if it appears
    const howManyInput = this.page.getByPlaceholder('how many');
    if (await this.isVisible(howManyInput)) {
      await howManyInput.fill('1');
      const unitsCombobox = this.page.getByRole('combobox');
      await unitsCombobox.click();
      await this.page.waitForTimeout(500);
      await this.page.getByRole('option').first().click();
      await this.page.waitForTimeout(500);
      await this.page.getByRole('button', { name: 'Save' }).click();
      await this.page.waitForTimeout(500);
    }
  }

  async verifyRecipeDetailPageLoaded() {
    await expect(this.page).toHaveURL(/\/recipe\/\d+\?category=MENU/, { timeout: TIMEOUT.default });
    await expect(this.page).toHaveTitle('Recipe', { timeout: TIMEOUT.default });
  }

  async toggleRecipeOff(): Promise<'deactivated' | 'in_use'> {
    const recipeToggle = this.page.locator('[data-testid="activationButton"]');
    await recipeToggle.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await recipeToggle.click();

    const recipeInUseModal = this.page.getByRole('dialog').filter({ hasText: /recipe in use/i });
    try {
      await recipeInUseModal.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    } catch {
      return 'deactivated';
    }

    if (await this.isVisible(recipeInUseModal)) {
      await this.page.waitForTimeout(3000);
      const modalButton = recipeInUseModal.getByRole('button').first();
      if (await this.isVisible(modalButton)) {
        await modalButton.click();
      } else {
        await this.page.keyboard.press('Escape');
      }
      await this.page.waitForTimeout(1000);
      return 'in_use';
    }

    return 'deactivated';
  }

  async verifyRecipeDisabled() {
    const disabledBanner = this.page.locator('div.tvA8-YbO7y6KD1lLM\\+3Rjw\\=\\=');
    await expect(disabledBanner).toBeVisible({ timeout: TIMEOUT.default });
    await expect(disabledBanner.locator('span')).toHaveText('Recipe Is Disabled');
  }

  async getMenuItemCost(name: string): Promise<string> {
    const row = this.page.getByRole('row').filter({ hasText: name }).first();
    await row.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    const cells = row.getByRole('cell');
    const count = await cells.count();
    for (let i = 0; i < count; i++) {
      const text = (await cells.nth(i).textContent())?.trim() || '';
      if (/^\$?\d+(\.\d+)?$/.test(text)) {
        return text.replace('$', '');
      }
    }
    return '';
  }
}
