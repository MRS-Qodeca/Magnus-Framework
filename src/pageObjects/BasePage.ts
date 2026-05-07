import { Page } from '@playwright/test';
import { WebActions } from '../utils/WebActions';
import { testConfig } from '../testConfig';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly actions: WebActions;
  protected readonly config = testConfig;

  constructor(page: Page) {
    this.page = page;
    this.actions = new WebActions(this.page);
  }

  /**
   * Czeka na pełne załadowanie strony (brak aktywności sieciowej). /
   * Waits for the page to be fully loaded (no network activity).
   */
  async waitForPageLoaded(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Pobiera tytuł aktualnej strony. /
   * Retrieves the title of the current page.
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Pobiera aktualny adres URL. /
   * Retrieves the current URL.
   */
  async getUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wykonuje asercję "miękką" na URL strony (opcjonalne, ale przydatne). /
   * Performs a "soft" assertion on the page URL (optional but useful).
   */
  async verifyUrl(expectedUrl: string | RegExp): Promise<void> {
    const { expect } = require('@playwright/test'); // Import lokalny, by uniknąć problemów z cyklicznością / Local import to avoid circular dependency issues
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
