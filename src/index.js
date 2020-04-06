#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const report = require('yurnalist');
const setupLambdaLocal = require('./utils/setupLambdaLocal');
const setupAWSSDK = require('./utils/setupAWSSDK');
const setupJest = require('./utils/setupJest');
const setupEslintPrettier = require('./utils/setupEslintPrettier');
const setupHusky = require('./utils/setupHusky');
const configPackageJSON = require('./utils/configPackageJSON');
const configBuildspec = require('./utils/configBuildspec');
const configTemplate = require('./utils/configTemplate');
const createEvent = require('./utils/createEvent');
const createIndex = require('./utils/createIndex');
const configGitIgnore = require('./utils/configGitIgnore');

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
      await setupHusky();
      await configPackageJSON();
      await configBuildspec();
      await configTemplate();
      await createEvent();
      await createIndex();
      await configGitIgnore();
    } catch (e) {
      report.error(e);
      process.exit(0);
    }
  },
).argv;
