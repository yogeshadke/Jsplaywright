// Locator class for Playwright POM
// Encapsulates selectors for a sample Login page

export class LoginLocators {
  static loginModalButton = '#login2';
  static usernameInput = '#loginusername';
  static passwordInput = '#loginpassword';
  static loginButton = 'button[onclick="logIn()"]';
}
