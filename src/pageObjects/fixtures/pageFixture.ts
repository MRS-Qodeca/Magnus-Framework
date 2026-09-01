import { test as base } from '@playwright/test';
import { WebActions } from '../../utils/WebActions';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { DropdownPage } from '../pages/DropdownPage';
// Tu będziemy importować kolejne strony w miarę ich tworzenia / Here we will import additional pages as we create them

// Definiujemy typy dla naszych fixtures / Define types for our fixtures
type MyFixtures = {
  webActions: WebActions;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  // Dodaj kolejne strony tutaj / Add more pages here
};

// Rozszerzamy bazowy test o nasze obiekty / Extend the base test with our page objects

export const pageFixture = base.extend<MyFixtures>({
  webActions: async ({ page }, use) => {
    const webActions = new WebActions(page);
    await use(webActions);
  },

  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },

  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },

  // Dodaj kolejne strony tutaj / Add more pages here
});

export { expect } from '@playwright/test';
