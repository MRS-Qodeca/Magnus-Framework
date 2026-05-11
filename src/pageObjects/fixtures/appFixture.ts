import { mergeTests } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { componentFixture } from './componentFixture';
import { allure } from 'allure-playwright';

/**
 * Łączymy pageFixtures i componentFixtures w jeden potężny test /
 * We merge pageFixtures and componentFixtures into one powerful test
 */
export const test = mergeTests(pageFixture, componentFixture);

/**
 * Globalny beforeEach, który analizuje tagi z tytułu testu i dodaje je do raportu Allure /
 * Global beforeEach that parses tags from the test title and adds them to the Allure report
 */
test.beforeEach(async ({}, testInfo) => {
  const tags = testInfo.title.match(/@\w+/g);

  if (tags) {
    for (const tag of tags) {
      // Usuwamy '@' i dodajemy jako czysty tag do raportu / We remove '@' and add it as a clean tag to the report
      const cleanTag = tag.replace('@', '');
      await allure.tag(cleanTag);

      // Opcjonalnie: Specjalne traktowanie dla severity / Optional: Special handling for severity
      if (['critical', 'blocker', 'minor'].includes(cleanTag)) {
        await allure.severity(cleanTag as any);
      }
    }
  }
});

export { expect } from '@playwright/test';
