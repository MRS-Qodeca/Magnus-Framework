/* Metoda użycia: aby w testach wykorzystać funkcje z tej klasy, należy stworzyć jej instancję, przekazując aktualną stronę i kontekst przeglądarki, np. this.webActions.getPDFText(kontekst strony) /
   Usage method: to use the functions from this class in tests, you need to create an instance of it, passing the current page and browser context, e.g., this.webActions.getPDFText(browserContext) */

import fs from 'fs';
import type { Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import { Workbook } from 'exceljs';
import { testConfig } from '../testConfig';
import * as pdfjslib from 'pdfjs-dist-es5';

/* NOTE: BrowserContext zakomentowany do czasu implementacji testów multi-sesyjnych / 
NOTE: BrowserContext is commented out until the implementation of multi-session tests */
export class WebActions {
  readonly page: Page;
  /*readonly context: BrowserContext;*/

  constructor(page: Page /*context: BrowserContext*/) {
    this.page = page;
    /*this.context = context;*/
  }

  /**
   * Wstrzymuje wykonanie testu na określoną liczbę milisekund (używać tylko w ostateczności). /
   * Pauses the test execution for a specified number of milliseconds (use only as a last resort).
   */
  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  /**
   * Wpisuje tekst w pole formularza. /
   * Enters text into a form field.
   */
  async enterValue(locator: string, value: string): Promise<void> {
    await this.page.fill(locator, value);
  }

  /**
   * Klika w element zdefiniowany przez lokator. /
   * Clicks on an element defined by the locator.
   */
  async clickElement(locator: string): Promise<void> {
    await this.page.click(locator);
  }

  /**
   * Lokalizuje element po dokładnej treści tekstu i wykonuje kliknięcie. /
   * Locates an element by exact text content and performs a click.
   */
  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click();
  }

  /**
   * Wykonuje kliknięcie bezpośrednio przez silnik JavaScript przeglądarki (omija ograniczenia UI Playwrighta). /
   * Performs a click directly through the browser's JavaScript engine (bypassing Playwright's UI constraints).
   */
  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  /**
   * Odczytuje wartość tekstową z konkretnej komórki pliku Excel (.xlsx). /
   * Reads a text value from a specific cell in an Excel file (.xlsx).
   */
  async readDataFromExcel(
    fileName: string,
    sheetName: string,
    rowNum: number,
    cellNum: number,
  ): Promise<string> {
    const workbook = new Workbook();
    await workbook.xlsx.readFile(`./Downloads/${fileName}`);
    const sheet = workbook.getWorksheet(sheetName);
    if (!sheet) {
      throw new Error(
        `[PL] Arkusz o nazwie "${sheetName}" nie został znaleziony w pliku "${fileName}". \n` +
          `[EN] Worksheet named "${sheetName}" was not found in the file "${fileName}".`,
      );
    }
    const cellValue = sheet.getRow(rowNum).getCell(cellNum).toString();
    return cellValue;
  }

  /**
   * Pobiera całą treść z pliku tekstowego o podanej ścieżce. /
   * Retrieves the entire content from a text file at the given path.
   */
  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  /**
   * Zapisuje podane dane do pliku tekstowego (nadpisuje istniejącą treść). /
   * Writes the given data to a text file (overwrites existing content).
   */
  async writeDataIntoTextFile(filePath: string, data: string): Promise<void> {
    fs.writeFile(filePath, data, (error: any) => {
      // Dodano : any
      if (error) throw error;
    });
  }

  /**
   * Metoda pomocnicza: Wyciąga tekst z pojedynczej strony obiektu PDF. /
   * Helper method: Extracts text from a single page of a PDF object.
   */
  async getPdfPageText(pdf: any, pageNo: number) {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map((token: any) => token.str).join('');
    return pageText;
  }

  /**
   * Odczytuje surowy tekst ze wszystkich stron wskazanego pliku PDF. /
   * Reads raw text from all pages of the specified PDF file.
   */
  async getPDFText(filePath: any): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const pdf = await pdfjslib.getDocument(dataBuffer).promise;
    const maxPages = pdf.numPages;
    const pageTextPromises = [];
    for (let pageNo = 1; pageNo <= maxPages; pageNo += 1) {
      pageTextPromises.push(this.getPdfPageText(pdf, pageNo));
    }
    const pageTexts = await Promise.all(pageTextPromises);
    return pageTexts.join(' ');
  }
}
