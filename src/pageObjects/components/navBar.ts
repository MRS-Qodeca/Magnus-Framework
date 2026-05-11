import { BasePageComponent } from '../basePageComponent';
import { Page } from '@playwright/test';

// Definiujemy interfejs dla konfiguracji lokatorów
export interface NavBarSelectors {
  root: string; // Główny kontener nawigacji
  links: Record<string, string>; // Mapa linków, np. { home: 'a#logo', cart: '.cart-icon' }
  searchInput?: string; // Opcjonalny selektor pola wyszukiwania
}

export class NavBar extends BasePageComponent {
  private readonly selectors: NavBarSelectors;

  constructor(page: Page, selectors: NavBarSelectors) {
    // Przekazujemy selectors.root (string) do BasePageComponent.
    // Dzięki naszej poprawce w klasie bazowej, zostanie on automatycznie zamieniony na Locator.
    super(page, selectors.root);
    this.selectors = selectors;
  }

  /**
   * Klika w link zdefiniowany w mapie links na podstawie klucza.
   * @param linkKey Klucz z obiektu NavBarSelectors.links (np. 'home' lub 'shirts')
   */
  async clickLink(linkKey: string): Promise<void> {
    const selector = this.selectors.links[linkKey];
    if (!selector) {
      throw new Error(
        `[Magnus] Link o kluczu "${linkKey}" nie został zdefiniowany w NavBarSelectors!`,
      );
    }

    // Używamy pancernych akcji z BasePageComponent
    await this.actions.clickElement(selector);
  }

  /**
   * Wpisuje frazę w wyszukiwarkę i zatwierdza klawiszem Enter.
   * @param query Fraza do wyszukania
   */
  async search(query: string): Promise<void> {
    if (!this.selectors.searchInput) {
      console.warn(
        '[Magnus] Próba użycia wyszukiwarki, która nie została zdefiniowana w selektorach NavBar.',
      );
      return;
    }

    // actions.enterValue automatycznie poczeka na widoczność i wyczyści pole
    await this.actions.enterValue(this.selectors.searchInput, query);
    await this.page.keyboard.press('Enter');
  }

  /**
   * Sprawdza, czy konkretny link jest widoczny wewnątrz Navbaru.
   */
  async isLinkVisible(linkKey: string): Promise<boolean> {
    const selector = this.selectors.links[linkKey];
    if (!selector) return false;

    // Szukamy elementu wewnątrz zakresu 'root' naszego komponentu
    return await this.root.locator(selector).isVisible();
  }
}
