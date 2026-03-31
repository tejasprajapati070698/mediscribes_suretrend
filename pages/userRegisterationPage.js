const locators = require('../src/locators'); // Assuming locators are defined in a separate file for maintainability

class userRegisterationPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

        // Step 1 Locators
        this.firstNameInput = page.locator(locators.signupPageLocators.firstNameInput);
        this.lastNameInput = page.locator(locators.signupPageLocators.lastNameInput);
        this.usernameInput = page.locator(locators.signupPageLocators.usernameInput);
        this.industryDropdown = page.locator(locators.signupPageLocators.industryDropdown);
        this.segmentDropdown = page.locator(locators.signupPageLocators.segmentDropdown);
        this.companyNameInput = page.locator(locators.signupPageLocators.companyNameInput);
        this.countryDropdown = page.locator(locators.signupPageLocators.countryDropdown);
        this.jobTitleDropdown = page.locator(locators.signupPageLocators.jobTitleDropdown);
        this.phoneInput = page.locator(locators.signupPageLocators.phoneInput);
        this.emailInput = page.locator(locators.signupPageLocators.emailInput);
        this.nextButton = page.locator(locators.signupPageLocators.nextButton);
        this.backToLoginButton = page.locator(locators.signupPageLocators.backToLoginButton);

        // Step 2 Locators
        this.submitButton = page.locator(locators.signupPageLocators.submitButton);
        this.captchaWidget = page.locator(locators.signupPageLocators.captchaWidget);
    }

    async navigate() {
        await this.page.goto('https://dev-suretrend.hygiena.com/Register');
    }
    async navigateToLogin() {
        await this.backToLoginButton.waitFor({ state: 'visible' });
        await this.backToLoginButton.click();
    }
    /**
     * Fill the complete registration workflow based on test data
     * Includes explicit waits for dependent dropdowns
     */
    async fillStepOne(userData) {
        if (userData.firstName) await this.firstNameInput.fill(userData.firstName);
        if (userData.lastName) await this.lastNameInput.fill(userData.lastName);
        if (userData.username) await this.usernameInput.fill(userData.username);

        // Handle Dropdowns with dynamic rendering logic
        if (userData.industryIndex) {
            await this.industryDropdown.selectOption({ index: userData.industryIndex });
            // Implicitly waits for dependent segment dropdown to populate and become enabled
            await this.page.waitForTimeout(500); // Sometimes angular digest needs a breath
        }

        if (userData.segmentIndex) {
            await this.segmentDropdown.selectOption({ index: userData.segmentIndex });
        }

        if (userData.companyName) await this.companyNameInput.fill(userData.companyName);

        if (userData.countryIndex) {
            await this.countryDropdown.selectOption({ index: userData.countryIndex });
            await this.page.waitForTimeout(500); // Wait for job titles
        }

        if (userData.jobTitleIndex) {
            await this.jobTitleDropdown.selectOption({ index: userData.jobTitleIndex });
        }

        if (userData.phone) await this.phoneInput.fill(userData.phone);
        if (userData.email) await this.emailInput.fill(userData.email);
    }

    async clickNext() {
        await this.nextButton.waitFor({ state: 'visible' });
        await this.nextButton.click();
    }

    async clickBackToLogin() {
        await this.backToLoginButton.waitFor({ state: 'visible' });
        await this.backToLoginButton.click();
    }

    async verifyCaptchaPresence() {
        // Assert that the captcha widget is rendered, which fulfills workflow testing requirements
        // without resorting to insecure dummy checks in an automation suite
        await this.captchaWidget.first().waitFor({ state: 'visible', timeout: 5000 });
        return await this.captchaWidget.first().isVisible();
    }

    async clickSubmit() {
        await this.submitButton.waitFor({ state: 'visible' });
        await this.submitButton.click();
    }

}

module.exports = { userRegisterationPage };
