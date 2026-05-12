import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { CheckboxesPage } from '../pages/checkboxesPage';
// Tu będziemy importować kolejne strony w miarę ich tworzenia / Here we will import additional pages as we create them

// Definiujemy typy dla naszych fixtures / Define types for our fixtures
type MyFixtures = {
  loginPage: LoginPage;
  checkboxesPage: CheckboxesPage;
};

// Rozszerzamy bazowy test o nasze obiekty / Extend the base test with our page objects
export const pageFixture = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  checkboxesPage: async ({ page }, use) => {
    const checkboxesPage = new CheckboxesPage(page);
    await use(checkboxesPage);
  },
});

export { expect } from '@playwright/test';
