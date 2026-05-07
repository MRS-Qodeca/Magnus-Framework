import { test, expect } from '../../src/pageObjects/fixtures/pageFixture';

test('Logowanie przez Basic Auth', async ({ loginPage }) => {
  await loginPage.navigateToBasicAuth();
  
  const text = await loginPage.getSuccessText();
  // Na tej stronie sukces to tekst zawierający "Congratulations!"
  expect(text).toContain('Congratulations!');
});