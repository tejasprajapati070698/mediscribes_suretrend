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
    captchaWidget: '.g-recaptcha, iframe[title="reCAPTCHA"], iframe[title*="recaptcha"]'
  }
};
