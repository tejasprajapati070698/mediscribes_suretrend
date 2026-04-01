const locators = require('../src/locators');
const { registrationURL } = require('../src/testData');
const { expect } = require('@playwright/test');

class userRegistrationPage {
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
        this.companyAddressInput = page.locator(locators.signupPageLocators.companyAddressInput);
        this.cityInput = page.locator(locators.signupPageLocators.cityInput);
        this.stateInput = page.locator(locators.signupPageLocators.stateInput);
        this.zipCodeInput = page.locator(locators.signupPageLocators.zipCodeInput);
        this.inoutAgreementCheckbox = page.locator(locators.signupPageLocators.inoutAgreementCheckbox);
        this.createAccountButton = page.locator(locators.signupPageLocators.createAccountButton);

        // Validation message Locators
        this.firstNameError = page.locator(locators.signupPageValidationLocators.firstNameError);
        this.lastNameError = page.locator(locators.signupPageValidationLocators.lastNameError);
        this.userNameError = page.locator(locators.signupPageValidationLocators.userNameError);
        this.industryError = page.locator(locators.signupPageValidationLocators.industryError);
        this.segmentError = page.locator(locators.signupPageValidationLocators.segmentError);
        this.companyError = page.locator(locators.signupPageValidationLocators.companyError);
        this.countryError = page.locator(locators.signupPageValidationLocators.countryError);
        this.jobTitleError = page.locator(locators.signupPageValidationLocators.jobTitleError);
        this.phoneError = page.locator(locators.signupPageValidationLocators.phoneError);
        this.emailError = page.locator(locators.signupPageValidationLocators.emailError);

        // Step 2 Locators
        this.submitButton = page.locator(locators.signupPageLocators.submitButton);
        this.captchaWidget = page.locator(locators.signupPageLocators.captchaWidget);

        // Step 2 Validation message Locators
        this.addressError = page.locator(locators.signupPageValidationLocators.addressError);
        this.cityError = page.locator(locators.signupPageValidationLocators.cityError);
        this.stateError = page.locator(locators.signupPageValidationLocators.stateError);
        this.zipCodeError = page.locator(locators.signupPageValidationLocators.zipCodeError);
        this.termsAgreementError = page.locator(locators.signupPageValidationLocators.termsAgreementError);
    }

    async navigate() {
        try {
            console.log(`Navigating to: ${registrationURL}`);
            await this.page.goto(registrationURL);
        } catch (error) {
            console.error(`Failed to navigate to registration URL: ${error.message}`);
            throw error;
        }
    }

    async navigateToLogin() {
        try {
            console.log("Navigating back to Login page...");
            await this.backToLoginButton.waitFor({ state: 'visible' });
            await this.backToLoginButton.click();
        } catch (error) {
            console.error(`Error navigating back to login: ${error.message}`);
            throw error;
        }
    }

    async fillStepOne(userData) {
        try {
            console.log("Starting Step One Registration filling...");
            if (userData.firstName) await this.firstNameInput.fill(userData.firstName);
            if (userData.lastName) await this.lastNameInput.fill(userData.lastName);
            if (userData.username) await this.usernameInput.fill(userData.username);

            if (userData.industryIndex) {
                console.log(`Selecting Industry index: ${userData.industryIndex}`);
                await this.industryDropdown.selectOption({ index: userData.industryIndex });
                await this.page.waitForTimeout(500);
            }

            if (userData.segmentIndex) {
                console.log(`Selecting Segment index: ${userData.segmentIndex}`);
                await this.segmentDropdown.selectOption({ index: userData.segmentIndex });
            }

            if (userData.companyName) await this.companyNameInput.fill(userData.companyName);

            if (userData.countryIndex) {
                console.log(`Selecting Country index: ${userData.countryIndex}`);
                await this.countryDropdown.selectOption({ index: userData.countryIndex });
                await this.page.waitForTimeout(500);
            }

            if (userData.jobTitleIndex) {
                await this.jobTitleDropdown.selectOption({ index: userData.jobTitleIndex });
            }

            if (userData.phone) await this.phoneInput.fill(userData.phone);
            if (userData.email) await this.emailInput.fill(userData.email);
            console.log("Step One filling completed.");
        } catch (error) {
            console.error(`Error in fillStepOne: ${error.message}`);
            throw error;
        }
    }

    async clickNext() {
        try {
            console.log("Clicking Next button");
            await this.nextButton.waitFor({ state: 'visible' });
            await this.nextButton.click();
        } catch (error) {
            console.error(`Failed to click Next: ${error.message}`);
            throw error;
        }
    }

    async verifyCaptchaPresence() {
        try {
            console.log("Verifying Captcha presence...");
            await this.captchaWidget.first().waitFor({ state: 'visible', timeout: 5000 });
            const isVisible = await this.captchaWidget.first().isVisible();
            console.log(`Captcha presence: ${isVisible}`);
            return isVisible;
        } catch (error) {
            console.error(`Captcha not found or visible: ${error.message}`);
            return false;
        }
    }

    async clickSubmit() {
        try {
            console.log("Clicking Submit button");
            await this.submitButton.waitFor({ state: 'visible' });
            await this.submitButton.click();
        } catch (error) {
            console.error(`Failed to click Submit: ${error.message}`);
            throw error;
        }
    }

    async fillFirstName(firstname) {
        try {
            console.log(`Inputting First Name: ${firstname}`);
            await this.firstNameInput.fill(firstname);
        } catch (error) { console.error(`Error filling First Name: ${error.message}`); throw error; }
    }

    async fillLastName(lastname) {
        try {
            console.log(`Inputting Last Name: ${lastname}`);
            await this.lastNameInput.fill(lastname);
        } catch (error) { console.error(`Error filling Last Name: ${error.message}`); throw error; }
    }

    async fillUsername(username) {
        try {
            console.log(`Inputting Username: ${username}`);
            await this.usernameInput.fill(username);
        } catch (error) { console.error(`Error filling Username: ${error.message}`); throw error; }
    }

    async fillCompanyName(companyname) {
        try {
            console.log(`Inputting Company: ${companyname}`);
            await this.companyNameInput.fill(companyname);
        } catch (error) { console.error(`Error filling Company: ${error.message}`); throw error; }
    }

    async fillPhone(phone) {
        try {
            console.log(`Inputting Phone: ${phone}`);
            await this.phoneInput.fill(phone);
        } catch (error) { console.error(`Error filling Phone: ${error.message}`); throw error; }
    }

    async fillEmail(email) {
        try {
            console.log(`Inputting Email: ${email}`);
            await this.emailInput.fill(email);
        } catch (error) { console.error(`Error filling Email: ${error.message}`); throw error; }
    }

    async fillCompanyAddress(address) {
        try {
            console.log(`Inputting Company Address: ${address}`);
            await this.companyAddressInput.fill(address);
        } catch (error) { console.error(`Error filling Address: ${error.message}`); throw error; }
    }

    async fillCity(city) {
        try {
            console.log(`Inputting City: ${city}`);
            await this.cityInput.fill(city);
        } catch (error) { console.error(`Error filling City: ${error.message}`); throw error; }
    }

    async fillState(state) {
        try {
            console.log(`Inputting State: ${state}`);
            await this.stateInput.fill(state);
        } catch (error) { console.error(`Error filling State: ${error.message}`); throw error; }
    }

    async fillZipCode(zip) {
        try {
            console.log(`Inputting Zip Code: ${zip}`);
            await this.zipCodeInput.fill(zip);
        } catch (error) { console.error(`Error filling Zip: ${error.message}`); throw error; }
    }

    async checkInoutAgreement() {
        try {
            console.log(`Checking In/Out Agreement Checkbox`);
            await this.inoutAgreementCheckbox.click();
        } catch (error) { console.error(`Error checking agreement: ${error.message}`); throw error; }
    }

    async clickCaptchaCheckbox() {
        try {
            console.log(`Attempting to click Captcha Checkbox within iframe...`);
            const recaptchaFrame = this.page.frameLocator('iframe[title="reCAPTCHA"]');
            await recaptchaFrame.getByRole('checkbox', { name: "I'm not a robot" }).click();
        } catch (error) {
            console.error(`Error interacting with Captcha: ${error.message}`);
            throw error;
        }
    }

    async clickCreateAccount() {
        try {
            console.log(`Clicking Create Account Button`);
            await this.createAccountButton.click();
        } catch (error) { console.error(`Error clicking Create Account: ${error.message}`); throw error; }
    }

    async verifyDefaultValuesOfAllFields() {
        try {
            console.log("Verifying all default field values are empty/correct...");
            await expect(this.firstNameInput).toBeEmpty();
            await expect(this.lastNameInput).toBeEmpty();
            await expect(this.usernameInput).toBeEmpty();
            await expect(this.companyNameInput).toBeEmpty();
            await expect(this.phoneInput).toBeEmpty();
            await expect(this.emailInput).toBeEmpty();
            await expect(this.industryDropdown).toContainText('What industry are you in?');
            await expect(this.countryDropdown).toContainText('Please select a country');
        } catch (error) {
            console.error(`Default values verification failed: ${error.message}`);
            throw error;
        }
    }

    async verifyValidationMessagesForEmptySubmission(firstname, lastname, username, companyname, phone, email) {
        // Standard text inputs - toBeEmpty() works for <input> and <textarea>
        await this.firstNameInput.fill(firstname);
        await this.lastNameInput.fill(lastname);
        await this.usernameInput.fill(username);
        await this.companyNameInput.fill(companyname);
        await this.phoneInput.fill(phone);
        await this.emailInput.fill(email);

        // Dropdowns: Use toHaveText() to verify the visible placeholder label
        // Use regular expressions (e.g., /.../) to handle accidental whitespace issues
        await expect(this.industryDropdown).toContainText('What industry are you in?');
        await expect(this.segmentDropdown).toContainText('Please specify industry segment');
        await expect(this.countryDropdown).toContainText('Please select a country');
        await expect(this.jobTitleDropdown).toContainText('Please select a job title');
    }

    async verifyValidationMessagesForEmptySubmissionStep2(companyAddress, city, state, zipcode) {
        // Standard text inputs - toBeEmpty() works for <input> and <textarea>
        await this.companyAddressInput.fill(companyAddress);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipCodeInput.fill(zipcode);
    }
    
    async validatemessage(locator, expectedMessage) {
        try {
            console.log(`Validating message: "${expectedMessage}"`);
            await expect(locator).toHaveText(expectedMessage);
        } catch (error) {
            console.error(`Validation failed. Expected "${expectedMessage}", but found an error: ${error.message}`);
            throw error;
        }
    }

    // Individual Error Validations
    async validateFirstNameError(msg) { await this.validatemessage(this.firstNameError, msg); }
    async validateLastNameError(msg) { await this.validatemessage(this.lastNameError, msg); }
    async validateUsernameError(msg) { await this.validatemessage(this.userNameError, msg); }
    async validateCompanyNameError(msg) { await this.validatemessage(this.companyError, msg); }
    async validatePhoneError(msg) { await this.validatemessage(this.phoneError, msg); }
    async validateEmailError(msg) { await this.validatemessage(this.emailError, msg); }
    async validateCompanyAddressError(msg) { await this.validatemessage(this.addressError, msg); }
    async validateCityError(msg) { await this.validatemessage(this.cityError, msg); }
    async validateStateError(msg) { await this.validatemessage(this.stateError, msg); }
    async validateZipCodeError(msg) { await this.validatemessage(this.zipCodeError, msg); }
    async validateTermsAgreementError(msg) { await this.validatemessage(this.termsAgreementError, msg); }

    async selectIndustryOption(optionText) {
        try {
            console.log(`Selecting Industry: ${optionText}`);
            await this.industryDropdown.waitFor({ state: 'visible' });
            await this.industryDropdown.selectOption({ label: optionText });
        } catch (error) { console.error(`Error selecting Industry option: ${error.message}`); throw error; }
    }

    async selectIndustrySegment(optionText) {
        try {
            console.log(`Selecting Industry Segment: ${optionText}`);
            await this.segmentDropdown.waitFor({ state: 'visible' });
            await this.segmentDropdown.selectOption({ label: optionText.trim() });
        } catch (error) { console.error(`Error selecting Segment: ${error.message}`); throw error; }
    }

    async selectCountry(optionText) {
        try {
            console.log(`Selecting Country: ${optionText}`);
            await this.countryDropdown.waitFor({ state: 'visible' });
            await this.countryDropdown.selectOption({ label: optionText.trim() });
        } catch (error) { console.error(`Error selecting Country: ${error.message}`); throw error; }
    }

    async selectJobTitle(optionText) {
        try {
            console.log(`Selecting Job Title: ${optionText}`);
            await this.jobTitleDropdown.waitFor({ state: 'visible' });
            await this.jobTitleDropdown.selectOption({ label: optionText.trim() });
        } catch (error) { console.error(`Error selecting Job Title: ${error.message}`); throw error; }
    }
}

module.exports = { userRegistrationPage };