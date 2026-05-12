/**
 * To jest klasa bazowa dla wszystkich stron w naszym frameworku. Zawiera wspólne metody i funkcje pomocnicze, które mogą być używane przez wszystkie strony. /
 * This is the base class for all pages in our framework. It contains common methods and helper functions that can be used by all pages.
 */

import { Page } from '@playwright/test';
import { WebActions } from '../utils/webActions';
import { testConfig } from '../testConfig';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly actions: WebActions;
  protected abstract readonly path: string;
  protected readonly config = testConfig;

  constructor(page: Page) {
    this.page = page;
    this.actions = new WebActions(this.page);
  }

  /**
   * --- OGÓLNE METODY I FUNKCJE POMOCNICZE DLA WSZYSTKICH STRON --- /
   * --- GENERAL METHODS AND HELPER FUNCTIONS FOR ALL PAGES ---
   */

  /**
   * Nawigacja do strony - używa zdefiniowanego patha. /
   * Navigates to the page using the defined path.
   */
  async open() {
    if (!this.path) throw new Error('This page has no defined path!');
    await this.navigate(this.path);
  }

  /**
   * Automatyczna nawigacja do root. /
   * Automatic navigation to root.
   * */
  async navigate(path: string = '') {
    await this.page.goto(path);
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
    const { expect } = require('@playwright/test');
    await expect(this.page).toHaveURL(expectedUrl);
  }
}
