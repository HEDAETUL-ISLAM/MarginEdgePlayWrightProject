import { Page, Locator, expect } from '@playwright/test';
import { BasePage, TIMEOUT } from '../BasePage';

export class UserPage extends BasePage {
  private readonly setupNavLink: Locator;
  private readonly setupUsersLink: Locator;
  private readonly showDropdownButton: Locator;
  private readonly userSearchInput: Locator;
  private readonly officeDropdown: Locator;
  private readonly saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.setupNavLink = page.getByText('Setup', { exact: true }).first();
    this.setupUsersLink = page.getByRole('button', { name: /users/i }).first();
    this.showDropdownButton = page.locator('button.btn-info.dropdown-toggle');
    this.userSearchInput = page.locator('input[ng-model="filterValue"][placeholder="Search"]');
    this.officeDropdown = page.locator('select[name="office"]');
    this.saveButton = page.getByRole('button', { name: /save/i }).first();
  }

  async navigateToSetupUsersViaLeftNav() {
    await this.navigateTo(this.baseUrl, TIMEOUT.extended);
    await this.setupNavLink.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
    await this.setupNavLink.click();
    await this.setupUsersLink.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
    await this.setupUsersLink.click();
    await this.waitForPageLoad();
    await this.page.waitForTimeout(2000);
  }

  async selectMarginEdgeStaff() {
    await this.showDropdownButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.showDropdownButton.click();
    await this.page.waitForTimeout(500);
    const marginEdgeStaffOption = this.page.locator('a, li, [role="menuitem"]').filter({ hasText: /marginedge staff/i }).first();
    await marginEdgeStaffOption.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await marginEdgeStaffOption.click();
    await this.waitForPageLoad();
    await this.page.waitForTimeout(2000);
  }

  async searchUser(name: string) {
    await this.userSearchInput.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.userSearchInput.fill(name);
    await this.page.waitForTimeout(2000);
  }

  async clearUserSearch() {
    await this.userSearchInput.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.userSearchInput.clear();
    await this.page.waitForTimeout(1000);
  }

  async openUserRow(rowIndex: number) {
    const row = this.page.locator('.ui-grid-canvas .ui-grid-row').nth(rowIndex - 1);
    await row.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    const cellContent = row.locator('.ui-grid-cell-contents').first();
    await cellContent.dblclick();
    await this.waitForPageLoad();
    await this.page.waitForTimeout(3000);
  }

  async selectOffice(officeName: string) {
    await this.officeDropdown.waitFor({ state: 'visible', timeout: TIMEOUT.long });
    await this.officeDropdown.selectOption({ label: officeName });
    await this.page.waitForTimeout(500);
  }

  async scrollToBottomAndSave() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await this.page.waitForTimeout(1000);
    await this.saveButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.saveButton.click();
    await this.waitForPageLoad();
    await this.page.waitForTimeout(2000);
  }
}
