const locators = require('../src/locators');
const { test, expect } = require('@playwright/test');
const {loginURL, registrationURL} = require('../src/testData');
class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // Abstracting locators from constants file
    this.usernameInput = page.locator(locators.loginPageLocators.usernameInput);
    this.passwordInput = page.locator(locators.loginPageLocators.passwordInput);
    this.signInButton = page.locator(locators.loginPageLocators.loginButton);
    this.createAccountLink = page.locator(locators.loginPageLocators.createAccountLink);
  }

  async navigateToLoginPage() {
    await this.page.goto(loginURL);
  }
 
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async clickCreateAccount() {
    // Explicit wait for link to be visible before clicking
    await this.createAccountLink.waitFor({ state: 'visible' });
    await this.createAccountLink.click();
  }
}

module.exports = { LoginPage };
