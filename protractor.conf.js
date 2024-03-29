// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
exports.config = {
  allScriptsTimeout: 11000,
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': [
        '--start-maximized',
      ],
  }
  },

  directConnect: true,
  baseUrl: 'http://localhost:4200', // Local URL

  specs: [
    './e2e/features/Login.feature',
    './e2e/features/*/GenericCreate.feature',
    './e2e/features/*/GenericRead.feature',
    './e2e/features/*/GenericEdit.feature',
    './e2e/features/*/GenericDelete.feature',
  ],
  framework:'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  cucumberOpts: {
    require: [
      './e2e/step_definitions/*.definitions.ts',
      './e2e/hooks/*.hooks.ts'
    ],
    tags: [],
    strict: true,
    format: [
      'json:reports/summary.json',
    ],
    dryRun: false,
    compiler: []
  },

  params: {
    itemDetails: {},
    root: process.cwd(),
    defaultTimer: 15000,
    project: 'hmws',
  },

  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },

  ignoreUncaughtExceptions: true,
};