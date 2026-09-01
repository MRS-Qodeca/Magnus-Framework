import { BasePage } from '../BasePage';
import { CheckboxGroup } from '../components/CheckboxGroup';
import { Page } from '@playwright/test';

export class CheckboxesPage extends BasePage {
  protected readonly path = '/checkboxes';

  // Komponent jako publiczny atrybut - pełna kompozycja / Component as a public attribute - full composition
  public readonly group: CheckboxGroup;

  constructor(page: Page) {
    super(page);
    // Inicjalizujemy komponent z rootem 'form#checkboxes' / Initialize the component with the root 'form#checkboxes'
    this.group = new CheckboxGroup(page, { root: 'form#checkboxes' });
  }

  async checkFirst() {
    await this.group.checkByIndex(0);
  }

  async isFirstChecked(): Promise<boolean> {
    return await this.group.isChecked(0);
  }

  async checkSecond() {
    await this.group.checkByIndex(1);
  }

  async isSecondChecked(): Promise<boolean> {
    return await this.group.isChecked(1);
  }
}

/*
 * ALTERNATYWA - jeśli chcemy mieć komponenty jako prywatne atrybuty, możemy zrobić to tak: /
 * ALTERNATIVE - if we want to have components as private attributes, we can do it like this:
 */

// import { BasePage } from '../basePage';
// import { CheckboxGroup } from '../components/CheckboxGroup';

// export class CheckboxesPage extends BasePage {
//   protected readonly path = '/checkboxes';
//   public readonly group: CheckboxGroup;

//   async checkFirst() {
//   await this.group.checkByIndex(0);
// }

/**
 * Jest to lepsze rozwiązanie, jeśli komponenty są tylko częścią implementacji strony i nie chcemy, aby były dostępne na zewnątrz.
 * Sprawdza się również lepiej, jeśli testujemy małe strony, dla których nie warto tworzyć osobnych klas komponentów. /
 * This is a better solution if the components are just part of the page implementation and we don't want them to be accessible from outside.
 * It also works better when testing small pages for which it's not worth creating separate component classes.
 */
