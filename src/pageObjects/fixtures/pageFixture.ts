import { test as base } from '@playwright/test';
import { WebActions } from '../../utils/WebActions';
import { ExamplePage } from '../pages/ExamplePage';
import { LoginPage } from '../pages/LoginPage';
import { CheckboxesPage } from '../pages/CheckboxesPage';
import { DropdownPage } from '../pages/DropdownPage';
import { DownloadPage } from '../pages/DownloadPage';
// Tu będziemy importować kolejne strony w miarę ich tworzenia / Here we will import additional pages as we create them

// Definiujemy typy dla naszych fixtures / Define types for our fixtures
type MyFixtures = {
  webActions: WebActions;
  examplePage: ExamplePage;
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
  dropdownPage: DropdownPage;
  downloadPage: DownloadPage;
  // Dodaj kolejne strony tutaj / Add more pages here
};

// Rozszerzamy bazowy test o nasze obiekty / Extend the base test with our page objects

export const pageFixture = base.extend<MyFixtures>({
  webActions: async ({ page }, use) => {
    const webActions = new WebActions(page);
    await use(webActions);
  },

  examplePage: async ({ page }, use) => {
    const examplePage = new ExamplePage(page);
    await use(examplePage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },

  dropdownPage: async ({ page }, use) => {
    const dropdownPage = new DropdownPage(page);
    await use(dropdownPage);
  },

  downloadPage: async ({ page }, use) => {
    const downloadPage = new DownloadPage(page);
    await use(downloadPage);
  },

  // Dodaj kolejne strony tutaj / Add more pages here
});

export { expect } from '@playwright/test';
