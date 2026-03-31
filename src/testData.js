module.exports = {
  validUsers: [
    {
      testDescription: 'Standard valid user payload',
      firstName: 'Emily',
      lastName: 'Blunt',
      username: `emily_${Date.now()}`,
      industryIndex: 2, 
      segmentIndex: 1,
      companyName: 'Hygiena Test Corp',
      countryIndex: 2,
      jobTitleIndex: 1,
      phone: '18005551234',
      email: `emily.blunt_${Date.now()}@example.com`
    }
  ],
  invalidData: {
    invalidEmail: 'not-an-email-format',
    shortUsername: 'em',
    invalidPhone: 'abc'
  }
};
