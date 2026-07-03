import { BasePage } from '../../pageObjects/BasePage';
import { Page } from '@playwright/test';

export class DownloadPage extends BasePage {
  protected readonly path = '/download';

  private fileLink(fileName: string) {
    return this.page.getByText(fileName, { exact: true });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.path);
    await this.page.waitForURL(`**${this.path}`);
  }

  async downloadFileByName(fileName: string, saveDirectory: string): Promise<string> {
    const triggerElement = this.fileLink(fileName);
    const downloadedPath = await this.actions.downloadFile(triggerElement, saveDirectory);
    return downloadedPath;
  }
}
