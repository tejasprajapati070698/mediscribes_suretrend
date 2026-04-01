const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Login Tests', () => {

    test.only('Navigate to Signup Page', async ({ page }) => {
        console.log('Test: Navigate to Signup Page');
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await expect(page).toHaveURL(/.*login/i);
        await loginPage.clickCreateAccount();
        await expect(page).toHaveURL(/.*register/i);
    });
});