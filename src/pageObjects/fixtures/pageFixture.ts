import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckboxesPage } from '../pages/checkboxesPage';

// Tu będziesz importować kolejne strony w miarę ich tworzenia / Here you will import additional pages as you create them

// Definiujemy typy dla naszych fixtures / Define types for our fixtures
type MyFixtures = {
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
};

// Rozszerzamy bazowy test o nasze obiekty / Extend the base test with our page objects
export const pageFixture = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    // Tworzymy nową instancję, przekazując samo 'page' (nasz BasePage i WebActions zajmą się resztą) / We create a new instance, passing just the 'page' (our BasePage and WebActions will handle the rest)
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },
});

export { expect } from '@playwright/test';
