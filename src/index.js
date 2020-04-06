#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const report = require('yurnalist');
const setupLambdaLocal = require('./utils/setupLambdaLocal');
const setupAWSSDK = require('./utils/setupAWSSDK');
const setupJest = require('./utils/setupJest');
const setupEslintPrettier = require('./utils/setupEslintPrettier');

require('yargs').command(
  '$0',
  'Initialize a Lambda Application with best practices',
  () => {},
  async () => {
    report.info('Initialization of Lambda application started');
    try {
      await setupLambdaLocal();
      await setupAWSSDK();
      await setupJest();
      await setupEslintPrettier();
    } catch (e) {
      report.error(e);
      process.exit(0);
    }
  },
).argv;
