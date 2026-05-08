import { mergeTests } from '@playwright/test';
import { pageFixture } from './pageFixture';
import { componentFixture } from './componentFixture';

// Łączymy oba światy w jeden potężny test
export const test = mergeTests(pageFixture, componentFixture);

export { expect } from '@playwright/test';