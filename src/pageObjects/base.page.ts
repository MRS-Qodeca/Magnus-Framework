import { type Page } from '@playwright/test';
import Footer from './components/footer';
import NavBar from './components/navBar';

export abstract class BasePage {
  public footer: Footer;
  public navBar: NavBar;

  constructor(readonly page: Page) {
    this.footer = new Footer(this.page.locator('footer'));
    this.navBar = new NavBar(this.page.locator('nav').first());
  }

  async open(path: string) {
    await this.page.goto(path);
  }
}
