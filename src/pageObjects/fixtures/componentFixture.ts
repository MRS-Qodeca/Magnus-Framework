import { test as base } from '@playwright/test';
import { Dropdown, DropdownSelectors } from '../components/Dropdown';
import { CheckboxGroup, CheckboxSelectors } from '../components/CheckboxGroup';
import { Button, ButtonSelectors } from '../components/Button';

// 1. Rozszerzamy typy o nasze komponenty / We extend the types with our components
type MyComponentFixtures = {
  dropdown: Dropdown;
  checkboxGroup: CheckboxGroup;
  button: Button;
};

/**
 * Tu wrzucamy stałe dla konkretnego projektu, np. konfigurację NavBar i Footer /
 * Here we put constants for a specific project, e.g., NavBar and Footer configuration.
 */

const dropdownConfig: DropdownSelectors = {
  root: 'select#dropdown',
};

const checkboxGroupConfig: CheckboxSelectors = {
  root: 'form#checkboxes',
};

const buttonConfig: ButtonSelectors = {
  root: 'button#submit',
};

// 2. Rozszerzamy bazę o nasze obiekty / We extend the base with our objects
export const componentFixture = base.extend<MyComponentFixtures>({
  dropdown: async ({ page }, use) => {
    await use(new Dropdown(page, dropdownConfig));
  },

  // CheckboxGroup
  checkboxGroup: async ({ page }, use) => {
    await use(new CheckboxGroup(page, checkboxGroupConfig));
  },

  // Button
  button: async ({ page }, use) => {
    await use(new Button(page, buttonConfig));
  },
});
