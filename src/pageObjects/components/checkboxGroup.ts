import { BasePageComponent } from '../basePageComponent';

export class CheckboxGroup extends BasePageComponent {
  /**
   * Zaznacza lub odznacza checkbox na podstawie indeksu (0, 1, 2...) /
   * Checks or unchecks a checkbox based on its index (0, 1, 2...)
   */
  async checkByIndex(index: number): Promise<void> {
    const checkbox = this.root.locator('input').nth(index);
    await this.actions.clickElement(checkbox);
  }

  /**
   * Zwraca stan zaznaczenia (true/false) dla checkboxa na podstawie indeksu. /
   * Returns the checked state (true/false) for a checkbox based on its index.
   */
  async isChecked(index: number): Promise<boolean> {
    return await this.root.locator('input').nth(index).isChecked();
  }
}
