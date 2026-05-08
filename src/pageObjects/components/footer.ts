// src/pageObjects/components/Footer.ts
import { BasePageComponent } from '../BasePageComponent';
import { Page } from '@playwright/test';

export interface FooterSelectors {
  root: string;
  columns?: string;        // Selektor dla grup linków
  legalLinks?: string;     // Selektor dla linków regulaminowych na dole
  copyrightText?: string;  // Selektor dla tekstu stopki
  socialLinks?: string;    // Selektor dla ikon social media
}

export class Footer extends BasePageComponent {
  private readonly selectors: FooterSelectors;

  constructor(page: Page, selectors: FooterSelectors) {
    // Dzięki poprawce w BasePageComponent, selectors.root (string) zadziała bez błędu
    super(page, selectors.root);
    this.selectors = selectors;
  }

  // Metoda do pobierania tekstu copyright
  async getCopyrightText(): Promise<string | null> {
    if (!this.selectors.copyrightText) return null;
    return await this.root.locator(this.selectors.copyrightText).textContent();
  }

  // Metoda do klikania w linki prawne (np. Privacy Policy) po tekście
  async clickLegalLink(text: string) {
    if (!this.selectors.legalLinks) return;
    // Szukamy linku o konkretnym tekście wewnątrz obszaru legalLinks
    await this.root.locator(this.selectors.legalLinks).getByText(text).click();
  }

  // Sprawdzenie ile mamy kolumn w stopce
  async getColumnsCount(): Promise<number> {
    if (!this.selectors.columns) return 0;
    return await this.root.locator(this.selectors.columns).count();
  }
}