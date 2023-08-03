const { defineConfig } = require(`cypress`);

// TODO create codetour here about the Cypress.env stuff...?
module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 8000,
    downloadsFolder: `download`,
    env: {
      CYPRESS_ENVIRONMENTS: ``,
      CYPRESS_PASSWORD: ``,
      CYPRESS_USERNAME: ``,
    },
    fixturesFolder: `fixtures`,
    requestTimeout: 8000,
    retries: {
      openMode: 0,
      runMode: 1,
    },
    screenshotOnRunFailure: false,
    screenshotsFolder: `screenshots`,

    specPattern: `integration/**/*.test.{js,jsx,ts,tsx}`,
    supportFile: `support/index.js`,
    videoUploadOnPasses: false,
    videosFolder: `videos`,
    viewportHeight: 800,
    viewportWidth: 1600,

  },
});
