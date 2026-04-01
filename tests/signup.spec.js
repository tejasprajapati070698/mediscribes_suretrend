const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { time } = require('node:console');
const { userRegistrationPage } = require('../pages/userRegistrationPage');
const timeOut = 5000;
// Import the test data
const testData = require('../src/testData');
const messages = require('../src/messages');

test.describe('Signup Tests', () => {

  test('Verify Login Page UI', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await page.waitForTimeout(timeOut);
    await expect(page).toHaveURL(/.*login/i);

  });

  test('Verify "Create Account" and "BACK" button functionality', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    // Assert explicit navigation logic triggers
    await expect(page).toHaveURL(/.*Register/i);
    await page.waitForTimeout(timeOut);
    await registrationPage.navigateToLogin();
    await page.waitForTimeout(timeOut);
    await expect(page).toHaveURL(/.*login/i);
    await page.waitForTimeout(timeOut);
  });
  test('Verify All UI Elements Are Visible for Step 1', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.verifyDefaultValuesOfAllFields()
  });

  test('Verify Validation Messages for Empty Submission', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.verifyValidationMessagesForEmptySubmission(testData.emptyData.firstName, testData.emptyData.lastName, testData.emptyData.username, testData.emptyData.companyName, testData.emptyData.phone, testData.emptyData.email);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateFirstNameError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateLastNameError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateUsernameError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateCompanyNameError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validatePhoneError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateEmailError(messages.validationErrors.mandatoryFieldGeneric);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Firstname Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await registrationPage.fillFirstName(testData.shortData.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateFirstNameError(messages.shortDataErrors.firstName);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Lastname Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await registrationPage.fillLastName(testData.shortData.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateLastNameError(messages.shortDataErrors.lastName);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Username Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.shortData.username);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateUsernameError(messages.shortDataErrors.username);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Company Name Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.shortData.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateCompanyNameError(messages.shortDataErrors.companyName);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Phone Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.shortData.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validatePhoneError(messages.shortDataErrors.phone);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Email Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.shortData.email);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateEmailError(messages.shortDataErrors.email);
    await page.waitForTimeout(7000);
  });

  test('Enter all the details and go to next page. Verify Validation for All Empty Fields. ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.verifyValidationMessagesForEmptySubmissionStep2(testData.emptyData.companyAddress, testData.emptyData.city, testData.emptyData.state, testData.emptyData.zipcode);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);

    await registrationPage.validateCompanyAddressError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateCityError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateStateError(messages.validationErrors.mandatoryFieldGeneric);
    await registrationPage.validateZipCodeError(messages.validationErrors.mandatoryFieldGeneric);

  });

  test('Verify Validation for Company Address Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);

    await registrationPage.fillCompanyAddress(testData.shortData.companyAddress);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateCompanyAddressError(messages.shortDataErrors.companyAddress);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for City Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);

    await registrationPage.fillCity(testData.shortData.city);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateCityError(messages.shortDataErrors.city);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for State Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);

    await registrationPage.fillState(testData.shortData.state);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateStateError(messages.shortDataErrors.state);
    await page.waitForTimeout(7000);
  });

  test('Verify Validation for Zip Code Field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);

    await registrationPage.fillZipCode(testData.shortData.zipCode);
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.validateZipCodeError(messages.shortDataErrors.zipCode);
    await page.waitForTimeout(7000);
  });

  test('Verify Successful signup with valid data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const registrationPage = new userRegistrationPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.clickCreateAccount();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillFirstName(testData.validUsers.firstName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillLastName(testData.validUsers.lastName);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillUsername(testData.validUsers.username);

    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustryOption('Animal Health');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectIndustrySegment(' Auditors/Consultants ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyName(testData.validUsers.companyName);
    await page.waitForTimeout(timeOut);
    await registrationPage.selectCountry(' India ');
    await page.waitForTimeout(timeOut);
    await registrationPage.selectJobTitle(' QC/QA Manager ');
    await page.waitForTimeout(timeOut);
    await registrationPage.fillPhone(testData.validUsers.phone);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillEmail(testData.validUsers.email);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickNext();
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCompanyAddress(testData.validUsers.companyAddress);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillCity(testData.validUsers.city);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillState(testData.validUsers.state);
    await page.waitForTimeout(timeOut);
    await registrationPage.fillZipCode(testData.validUsers.zipcode);
    await page.waitForTimeout(timeOut);

    await registrationPage.clickCreateAccount();
    await registrationPage.checkInoutAgreement();
    await page.waitForTimeout(timeOut);
    await registrationPage.clickCaptchaCheckbox();
    await page.waitForTimeout(timeOut);

  });

});
