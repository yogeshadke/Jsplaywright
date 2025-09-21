import { expect } from '@playwright/test';

export class LoginActions {
  /**
   * @param {import('./LoginPage.js').LoginPage} loginPage
   */
  constructor(loginPage) {
    this.loginPage = loginPage;
  }

  async login(username, password) {
    await this.loginPage.usernameInput.fill(username);
    await this.loginPage.passwordInput.fill(password);
    await this.loginPage.loginButton.click();
  }
}
