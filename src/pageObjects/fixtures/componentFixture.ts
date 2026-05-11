// src/pageObjects/fixtures/componentFixture.ts
import { test as base } from '@playwright/test';
import { ExampleComponent } from '../components/exampleComponent';
import { NavBar, NavBarSelectors } from '../components/navBar';
import { Footer, FooterSelectors } from '../components/footer';
import { Dropdown } from '../components/dropdown';

// 1. ROZSZERZAMY TYPY
type MyComponentFixtures = {
  navBar: NavBar;
  footer: Footer;
  exampleComponent: ExampleComponent;
  exampleOnMainPage: ExampleComponent;
  dropdown: Dropdown;
};

/**
 * Tu wrzucamy stałe dla konkretnego projektu, np. konfigurację NavBar i Footer /
 * Here we put constants for a specific project, e.g., NavBar and Footer configuration.
 */
const storeNavBarConfig: NavBarSelectors = {
  root: 'nav.flex',
  links: {
    home: 'link[name="Acme Store"]',
    all: 'text=All',
    shirts: 'text=Shirts',
    stickers: 'text=Stickers',
  },
  searchInput: 'placeholder="Search for products..."',
};

const storeFooterConfig: FooterSelectors = {
  root: 'footer',
  columns: 'nav > div',
  legalLinks: 'ul.flex-col',
  copyrightText: 'p.text-sm',
};

// 2. IMPLEMENTACJA W BASE.EXTEND
export const componentFixture = base.extend<MyComponentFixtures>({
  navBar: async ({ page }, use) => {
    await use(new NavBar(page, storeNavBarConfig));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page, storeFooterConfig));
  },

  dropdown: async ({ page }, use) => {
    await use(new Dropdown(page, { root: 'select#dropdown' }));
  },

  exampleOnMainPage: async ({ page }, use) => {
    const component = new ExampleComponent(page, {
      root: '.main-container',
      input: '#user-input',
      button: '.submit-btn',
    });
    await use(component);
  },
});
