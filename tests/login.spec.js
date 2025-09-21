
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pageObjects/LoginPage.js';
import { LoginActions } from '../pageObjects/LoginActions.js';
import { AppConfig } from '../utils/appConfig.js';
import fs from 'fs';
import path from 'path';

const appName = process.env.APP_NAME || 'demoblaze';
const appConfig = AppConfig.getAppConfig(appName);

test.describe('Login Feature', () => {

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      // Only on failure
      const screenshotDir = 'screenshots';
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
      }
      const fileName = `${screenshotDir}/fail-${testInfo.title.replace(/\s+/g, '_')}-${Date.now()}.png`;
      await page.screenshot({ path: fileName, fullPage: true });
      console.log(`Screenshot for failed test saved: ${fileName}`);
    }
  });

  test('User can login with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);
    await page.goto(appConfig.baseURL);
    await expect(loginPage.loginModalButton).toBeVisible();
    await expect(loginPage.loginModalButton).toBeEnabled();
    await loginPage.openLoginModal();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(await loginPage.usernameInput.getAttribute('type')).toBe('text');
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(await loginPage.passwordInput.getAttribute('type')).toBe('password');
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    await loginActions.login(appConfig.login.username, appConfig.login.password);
    await expect(page.locator('#logout2')).toBeVisible();
    // Log for pass
    console.log('Login with valid credentials passed.');
  });


  test('User cannot login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);
    await page.goto(appConfig.baseURL);
    await expect(loginPage.loginModalButton).toBeVisible();
    await expect(loginPage.loginModalButton).toBeEnabled();
    await loginPage.openLoginModal();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(await loginPage.usernameInput.getAttribute('type')).toBe('text');
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(await loginPage.passwordInput.getAttribute('type')).toBe('password');
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    await loginActions.login('invalid@yopmail.com', 'wrongpass');
    // Wait for alert and check message
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('User does not exist.');
      await dialog.accept();
    });
  });


  test('User cannot login with empty fields', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);
    await page.goto(appConfig.baseURL);
    await expect(loginPage.loginModalButton).toBeVisible();
    await expect(loginPage.loginModalButton).toBeEnabled();
    await loginPage.openLoginModal();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(await loginPage.usernameInput.getAttribute('type')).toBe('text');
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(await loginPage.passwordInput.getAttribute('type')).toBe('password');
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    await loginActions.login('', '');
    // Wait for alert and check message
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Please fill out Username and Password.');
      await dialog.accept();
    });
  });

  test('User can logout after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);
    await page.goto(appConfig.baseURL);
    await expect(loginPage.loginModalButton).toBeVisible();
    await expect(loginPage.loginModalButton).toBeEnabled();
    await loginPage.openLoginModal();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEnabled();
    await expect(await loginPage.usernameInput.getAttribute('type')).toBe('text');
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeEnabled();
    await expect(await loginPage.passwordInput.getAttribute('type')).toBe('password');
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
    await loginActions.login(appConfig.login.username, appConfig.login.password);
    await expect(page.locator('#logout2')).toBeVisible();
    await page.click('#logout2');
    await expect(page.locator('#login2')).toBeVisible();
    // Log for pass
    console.log('Logout after login passed.');
  });
});
