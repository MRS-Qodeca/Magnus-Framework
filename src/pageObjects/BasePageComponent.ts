import { Locator, Page } from '@playwright/test';
import { WebActions } from '../utils/WebActions';

export abstract class BasePageComponent {
  protected readonly page: Page;
  protected readonly actions: WebActions;
  protected readonly host: Locator;

  constructor(page: Page, host: Locator) {
    this.page = page;
    this.host = host;
    this.actions = new WebActions(this.page);
  }

  /**
   * Sprawdza, czy komponent jest widoczny na stronie. /
   * Checks if the component is visible on the page.
   */
  async isVisible(): Promise<boolean> {
    return await this.host.isVisible();
  }

  /**
   * Czeka, aż komponent pojawi się na ekranie.
   * Waits for the component to appear on the screen.
   */
  async waitForVisible(): Promise<void> {
    await this.host.waitFor({ state: 'visible' });
  }

  /**
   * Przewija widok do komponentu.
   * Scrolls the view to the component.
   */
  async scrollTo(): Promise<void> {
    await this.host.scrollIntoViewIfNeeded();
  }
}
