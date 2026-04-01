const { stat } = require("node:fs");
const { shortData } = require("./testData");

module.exports = {
  validationErrors: {
    invalidEmail: 'Please enter a valid email address.', // Assuming standard generic validation message for demo
    mandatoryFieldGeneric: 'This field is required.',
    shortUsername: 'Username must contain at least'
  },
  shortDataErrors: {
    firstName: 'The first name must be a minimum length of 2.',
    lastName: 'The last name must be a minimum length of 2.',
    username: 'Username is not valid.',
    companyName: 'The company name must be a minimum length of 2.',
    phone: 'The phone must be a minimum length of 7.',
    email: 'Email is not valid.',
    companyAddress: 'The address must be a minimum length of 3.',
    city: 'City field has invalid data.',
    state: 'The state must be a minimum length of 2.',
    zipCode: 'The zip code must be a minimum length of 2.'
  }
};
