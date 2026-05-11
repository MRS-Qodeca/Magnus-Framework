// dropdown.ts
import { BasePageComponent } from '../basePageComponent';
import { Page } from '@playwright/test';

// 1. Dodajemy interfejs selektorów
export interface DropdownSelectors {
  root: string;
}

export class Dropdown extends BasePageComponent {
  // 2. Zmieniamy konstruktor, aby przyjmował obiekt zgodny z naszym szablonem
  constructor(page: Page, selectors: DropdownSelectors) {
    super(page, selectors.root);
  }
}
