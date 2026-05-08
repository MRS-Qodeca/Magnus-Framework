import { test as base } from '@playwright/test';
import { NavBar, NavBarSelectors } from '../components/navBar';
import { Footer, FooterSelectors } from '../components/footer';

// Definiujemy typy dla komponentów
type MyComponentFixtures = {
  navBar: NavBar;
  footer: Footer;
};

// Konfiguracja dla konkretnego projektu (możesz to później przenieść do osobnego pliku z danymi)
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

// Eksportujemy rozszerzony test tylko dla komponentów
export const componentFixture = base.extend<MyComponentFixtures>({
  navBar: async ({ page }, use) => {
    await use(new NavBar(page, storeNavBarConfig));
  },
  footer: async ({ page }, use) => {
    await use(new Footer(page, storeFooterConfig));
  },
});
