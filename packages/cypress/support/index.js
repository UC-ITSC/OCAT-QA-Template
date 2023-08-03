import './commands';

// Looks for the critical suite tests when the critical test command is run
beforeEach(function() {
  let testSuite = Cypress.env(`SUITE`);
  if (!testSuite) {
    return;
  }

  const testName = Cypress.mocha.getRunner().test.fullTitle();
  testSuite = `<${testSuite}>`;
  if (!testName.includes(testSuite)) {
    this.skip();
  }
});
