const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { time } = require('node:console');
const { userRegisterationPage } = require('../pages/userRegisterationPage');

test.describe('Login Tests', () => {

  test('User can attempt to login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    console.log('Navigating to Login Page...');
    await loginPage.navigate();
    await expect(page).toHaveURL(/.*login/i);

  });

  test('Verify navigation routing to Create New Account', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegisterationPage(page);
    await loginPage.navigate();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(5000);
    // Assert explicit navigation logic triggers
    await expect(page).toHaveURL(/.*Register/i);
    await page.waitForTimeout(5000);
    await registrationPage.navigateToLogin();
    await page.waitForTimeout(5000);
    await expect(page).toHaveURL(/.*login/i);
    await page.waitForTimeout(5000);
  });
});
