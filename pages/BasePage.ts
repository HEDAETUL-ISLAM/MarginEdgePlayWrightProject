import { Page, Locator } from '@playwright/test';
import { config } from '../config/config';

export { config };
export const TIMEOUT = config.timeouts;

export class BasePage {
  constructor(protected readonly page: Page) {
    // Auto-close photo viewer tabs when they open
    page.context().on('page', async (newPage) => {
      try {
        await newPage.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
        if (newPage.url().includes('/photoViewer')) {
          await newPage.close();
          await page.bringToFront();
        }
      } catch {
        // Page may already be closed
      }
    });
  }

  get baseUrl(): string {
    return config.baseUrl;
  }

  url(routeKey: keyof typeof config.routes): string {
    return `${config.baseUrl}${config.routes[routeKey]}`;
  }

  async navigateTo(url: string, timeout = TIMEOUT.long) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout });
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  async waitForPageLoad(timeout = TIMEOUT.long) {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible().catch(() => false);
  }

  async switchTenant(tenantName: string) {
    const tenantDropdown = this.page.locator('button#unitMenu_dd');
    await tenantDropdown.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await tenantDropdown.click();
    await this.page.waitForTimeout(1000);

    const escaped = tenantName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const tenantOption = this.page.getByRole('menuitem', { name: new RegExp(escaped, 'i') })
      .or(this.page.locator('li').filter({ hasText: new RegExp(escaped, 'i') }));
    await tenantOption.waitFor({ state: 'visible', timeout: TIMEOUT.default });
    await tenantOption.click();
    await this.page.waitForLoadState('load', { timeout: TIMEOUT.extended });
    await this.page.waitForLoadState('networkidle', { timeout: TIMEOUT.extended }).catch(() => {});
    await this.page.waitForTimeout(3000);
  }
}
