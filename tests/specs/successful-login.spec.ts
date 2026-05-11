import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test.describe('Login Functionality @smoke @login', () => {
  /**
   * Na wszelki wypadek beforeEach, jeśli każda asercja wymagałaby odświeżenia strony /
   * WE use beforeEach, in case each assertion requires refreshing the page
   */
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('Login successfully with basic auth', async ({ loginPage }) => {
    const message = await loginPage.getSuccessText();
    expect(message).toContain('Congratulations!');
  });

  test('Display correct header after login', async ({ loginPage }) => {
    const header = await loginPage.getHeaderText();
    expect(header).toBe('Basic Auth');
  });
});
