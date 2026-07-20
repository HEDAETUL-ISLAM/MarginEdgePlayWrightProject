import { Page, Locator } from '@playwright/test';
import { BasePage, TIMEOUT } from './BasePage';

export class LogInOutPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly submitButton: Locator;
  private readonly userNameDropdown: Locator;
  private readonly signOutButton: Locator;
  private readonly settingsButton: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[type="password"]:visible');
    this.submitButton = page.locator('button[type="submit"]');
    this.userNameDropdown = page.locator('#userNameDropdown');
    this.signOutButton = page.locator('a, button, [role="menuitem"]').filter({ hasText: /sign out/i }).first();
    this.settingsButton = page.locator('a[href="#/settings"]');
  }

  async goto() {
    await this.navigateTo(`${this.baseUrl}/`, TIMEOUT.global);
  }

  async login(username: string, password: string) {
    await this.usernameInput.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
    await this.usernameInput.fill(username);
    await this.submitButton.click();
    await this.waitForPageLoad();

    await this.passwordInput.waitFor({ state: 'visible', timeout: TIMEOUT.long });
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    await this.page.waitForURL(
      url => !url.href.includes('/login') && !url.href.includes('/auth') && !url.href.includes('/signin'),
      { timeout: TIMEOUT.extended, waitUntil: 'domcontentloaded' }
    );
    await this.page.waitForLoadState('load', { timeout: TIMEOUT.extended });
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUT.extended }).catch(() => {});
    await this.page.waitForTimeout(2000);
  }

  async navigateToSettings() {
    await this.userNameDropdown.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
    await this.userNameDropdown.click();
    await this.page.waitForTimeout(500);
    await this.settingsButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.settingsButton.click();
    await this.page.waitForLoadState('load', { timeout: TIMEOUT.extended });
    await this.page.waitForTimeout(2000);
  }

  async logout() {
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUT.default }).catch(() => {});
    await this.page.waitForTimeout(1000);
    await this.page.goto(`${this.baseUrl}/#/orders`, { waitUntil: 'domcontentloaded', timeout: TIMEOUT.extended });
    await this.page.waitForTimeout(1000);
    await this.userNameDropdown.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
    await this.userNameDropdown.click();
    await this.page.waitForTimeout(500);
    await this.signOutButton.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await this.signOutButton.click();
    await this.page.waitForLoadState('load', { timeout: TIMEOUT.extended });
    await this.page.waitForTimeout(3000);
    // Wait for login form to be ready
    await this.usernameInput.waitFor({ state: 'visible', timeout: TIMEOUT.extended });
  }
}
