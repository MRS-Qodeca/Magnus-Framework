import { BasePage } from '../basePage';

export class DropdownPage extends BasePage {
  async open(): Promise<void> {
    await this.page.goto('/dropdown');
  }
}
