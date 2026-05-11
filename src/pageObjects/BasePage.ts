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
   * Ogólne metody i funkcje pomocnicze dla wszystkich stron /
   * General methods and helper functions for all pages
   */

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
    const { expect } = require('@playwright/test');
    await expect(this.page).toHaveURL(expectedUrl);
  }

  /**
   * Automatyczna nawigacja do wybranego patha. Domyslnie przechodzi do root. /
   * Automatic navigation to a selected path. Defaults to root.
   * */
  async navigate(path: string = '') {
    await this.page.goto(path);
  }

  /**
   * Czyści pole przed wpisaniem tekstu. /
   * Clears the field before entering text.
   */
  protected async fill(selector: string, value: string) {
    const locator = this.page.locator(selector);
    await locator.fill('');
    await locator.fill(value);
  }
}
