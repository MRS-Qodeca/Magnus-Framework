import { BasePageComponent } from '../basePageComponent';
import { Page } from '@playwright/test';

// 1. INTERFEJS FUNKCJONALNY - Co tester widzi w podpowiedziach / Defining WHAT the component can do (Functional Interface)
export interface ICheckboxGroup {
  checkByIndex(index: number): Promise<void>;
  uncheckByIndex(index: number): Promise<void>;
  isChecked(index: number): Promise<boolean>;
  getCheckboxesCount(): Promise<number>;
}

// 2. SELEKTORY - Dane konfiguracyjne / Configuration data (Selectors)
export interface CheckboxSelectors {
  root: string; // Kontener otaczający wszystkie checkboxy (np. 'form#checkboxes') / Container that wraps all checkboxes (e.g., 'form#checkboxes')
}

// 3. KLASA - Implementacja logiki / Defining HOW the component does it (Implementation)
export class CheckboxGroup extends BasePageComponent implements ICheckboxGroup {
  private readonly selectors: CheckboxSelectors;

  constructor(page: Page, selectors: CheckboxSelectors) {
    super(page, selectors.root);
    this.selectors = selectors;
  }

  /**
   * Zaznacza checkbox na podstawie indeksu (0, 1, 2...). /
   * Checks a checkbox based on its index (0, 1, 2...).
   */
  async checkByIndex(index: number): Promise<void> {
    const checkbox = this.root.locator('input[type="checkbox"]').nth(index);
    /**
     * Używamy natywnej metody check(), która jest "inteligentna" (nie kliknie, jeśli już zaznaczone). /
     * We use the native check() method, which is "smart" (it won't click if it's already checked).
     */
    await checkbox.check();
  }

  /**
   * Odznacza checkbox na podstawie indeksu. /
   * Unchecks a checkbox based on its index.
   */
  async uncheckByIndex(index: number): Promise<void> {
    const checkbox = this.root.locator('input[type="checkbox"]').nth(index);
    await checkbox.uncheck();
  }

  /**
   * Zwraca stan zaznaczenia (true/false) dla checkboxa na podstawie indeksu. /
   * Returns the checked state (true/false) for a checkbox based on its index.
   */
  async isChecked(index: number): Promise<boolean> {
    return await this.root.locator('input[type="checkbox"]').nth(index).isChecked();
  }

  /**
   * Zwraca liczbę wszystkich checkboxów w grupie. /
   * Returns the count of all checkboxes in the group.
   */
  async getCheckboxesCount(): Promise<number> {
    return await this.root.locator('input[type="checkbox"]').count();
  }
}
