import { LoginLocators } from './LoginLocators.js';
export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.loginModalButton = page.locator(LoginLocators.loginModalButton);
    this.usernameInput = page.locator(LoginLocators.usernameInput);
    this.passwordInput = page.locator(LoginLocators.passwordInput);
    this.loginButton = page.locator(LoginLocators.loginButton);
  }

  async goto() {
    await this.page.goto('/');
  }

  async openLoginModal() {
    await this.loginModalButton.click();
  }
}
