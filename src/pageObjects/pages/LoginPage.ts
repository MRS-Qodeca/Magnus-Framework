import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  private readonly basicAuthPath = '/basic_auth';
  private readonly successMessageLocator = 'p'; // Tekst potwierdzający na tej konkretnej stronie

  async navigateToBasicAuth() {
    await this.page.goto(this.basicAuthPath);
  }

  async getSuccessText(): Promise<string | null> {
    return await this.page.textContent(this.successMessageLocator);
  }
}