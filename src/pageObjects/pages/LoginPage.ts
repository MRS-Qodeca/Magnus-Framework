import { BasePage } from '../BasePage';

export class LoginPage extends BasePage {
  // Selektor tekstowy dla komunikatu o sukcesie
  private readonly successMessageLocator = 'p';

  async navigateToBasicAuth() {
    // Playwright sam doklei baseURL z configa i poda dane logowania
    await this.page.goto('/basic_auth');
  }

  async getSuccessText(): Promise<string | null> {
    // Pobieramy tekst z akapitu
    return await this.page.textContent(this.successMessageLocator);
  }
}
