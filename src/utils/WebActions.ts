import fs from 'fs';
import type { Page } from '@playwright/test';
import { BrowserContext} from '@playwright/test';
import { Workbook } from 'exceljs';
import { testConfig } from '../testConfig';
import * as pdfjslib from 'pdfjs-dist-es5';

export class WebActions {
  readonly page: Page;
  readonly context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async clickByText(text: string): Promise<void> {
    await this.page.getByText(text, { exact: true }).click(); //Matches locator with exact text and clicks
  }

  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

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

  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  async writeDataIntoTextFile(filePath: string, data: string): Promise<void> {
    fs.writeFile(filePath, data, (error: any) => {
      // Dodano : any
      if (error) throw error;
    });
  }

  async getPdfPageText(pdf: any, pageNo: number) {
    const page = await pdf.getPage(pageNo);
    const tokenizedText = await page.getTextContent();
    const pageText = tokenizedText.items.map((token: any) => token.str).join('');
    return pageText;
  }

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
