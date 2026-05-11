import { BasePage } from '../basePage';

export class CheckboxesPage extends BasePage {
  private readonly checkbox1 = 'form#checkboxes input >> nth=0';
  private readonly checkbox2 = 'form#checkboxes input >> nth=1';

  async open() {
    await this.navigate('/checkboxes');
  }

  async checkFirst() {
    await this.actions.clickElement(this.checkbox1);
  }

  async isFirstChecked(): Promise<boolean> {
    return await this.page.isChecked(this.checkbox1);
  }

  async checkSecond() {
    await this.actions.clickElement(this.checkbox2);
  }

  async isSecondChecked(): Promise<boolean> {
    return await this.page.isChecked(this.checkbox2);
  }
}
