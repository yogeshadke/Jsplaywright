import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pageObjects/LoginPage.js';
import { LoginActions } from '../../pageObjects/LoginActions.js';

// Example regression test: Login and Logout

test.describe('Regression Suite - Login and Logout', () => {
  test('User can login and logout successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const loginActions = new LoginActions(loginPage);
    await loginPage.goto();
    await expect(loginPage.loginModalButton).toBeVisible();
    await loginPage.openLoginModal();
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await loginActions.login('rok@yopmail.com', 'test123');
    await expect(page.locator('#logout2')).toBeVisible();
    await page.click('#logout2');
    await expect(page.locator('#login2')).toBeVisible();
    console.log('Regression: Login and logout passed.');
  });
});
