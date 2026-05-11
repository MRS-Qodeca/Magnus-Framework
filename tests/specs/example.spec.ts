import { test, expect } from '../../src/pageObjects/fixtures/appFixture';

test('User can submit form', async ({ exampleOnMainPage }) => {
  await exampleOnMainPage.doSomething('Magnus Test');
  const value = await exampleOnMainPage.getValue();
  expect(value).toBe('Magnus Test');
});
