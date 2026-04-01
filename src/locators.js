module.exports = {
  loginPageLocators: {
    usernameInput: '#UserName',
    passwordInput: '#Password',
    loginButton: '#loginButton',
    createAccountLink: 'text="Create new account"'
  },
  signupPageLocators: {
    // Step 1
    firstNameInput: '#FirstName',
    lastNameInput: '#LastName',
    usernameInput: '#UserName',
    industryDropdown: '#Industry',
    segmentDropdown: '#Segment', // Appears after Industry selection
    companyNameInput: '#CompanyName',
    countryDropdown: '#CountryId',
    jobTitleDropdown: '#JobTitle', // Appears dynamically typically
    phoneInput: '#PhoneNumber',
    emailInput: '#Email',
    nextButton: '#btnNext',
    backToLoginButton: '#backToLoginDiv',

    // Step 2 (Assumed Common selectors based on standard workflows)
    submitButton: 'button:has-text("Register"), button:has-text("Sign up"), button:has-text("Create Account"), button[type="submit"]',
    captchaWidget: 'span#recaptcha-anchor > div:nth-of-type(1)',

    companyAddressInput: '#Address',
    cityInput: '#City',
    stateInput: '#DistrictState',
    zipCodeInput: '#PostalCode',
    inoutAgreementCheckbox: 'input#agreeCheckBox',
    createAccountButton: 'button#btnReg'
  },
  signupPageValidationLocators: {
    firstNameError: '#FirstName ~ .text-danger .errorParagraph',
    lastNameError: '#LastName ~ .text-danger .errorParagraph',
    userNameError: '#UserName ~ .text-danger .errorParagraph',
    industryError: '#Industry ~ .text-danger .errorParagraph',
    segmentError: '#Segment ~ .text-danger .errorParagraph',
    companyError: '#CompanyName ~ .text-danger .errorParagraph',
    countryError: '#CountryId ~ .text-danger .errorParagraph',
    jobTitleError: '#JobTitle ~ .text-danger .errorParagraph',
    phoneError: '#PhoneNumber ~ .text-danger .errorParagraph',
    emailError: '#Email ~ .text-danger .errorParagraph',
    addressError: '#Address ~ .text-danger .errorParagraph',
    cityError: '#City ~ .text-danger .errorParagraph',
    stateError: '#DistrictState ~ .text-danger .errorParagraph',
    zipCodeError: '#PostalCode ~ .text-danger .errorParagraph',
    termsAgreementError: '#agreeCheckBox ~ .errorParagraph.text-danger',
  }
};
