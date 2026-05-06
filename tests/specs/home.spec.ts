import { test, expect } from '../../src/pageObjects/fixtures/pageFixture';
import { testConfig } from '../../src/testConfig';

test.describe('Testy Techniczne - Home & Search', () => {
  test('Powinien otworzyć stronę główną i sprawdzić URL', async ({ homePage }) => {
    // Używamy homePage, który masz w src/pageObjects/pages/home.page.ts
    await homePage.open();

    // Sprawdzamy czy adres URL zawiera to, co mamy w configu
    await expect(homePage.page).toHaveURL(new RegExp(testConfig.qa));
  });

  test('Powinien przejść do strony wyszukiwania', async ({ searchPage }) => {
    // Używamy searchPage, który masz w src/pageObjects/pages/search.page.ts
    await searchPage.open('test-query');

    // Sprawdzamy czy w URL jest nasza fraza (metoda escape z Twojego screena)
    await expect(searchPage.page).toHaveURL(/.*search\?q=test-query.*/);
  });
});
