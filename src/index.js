#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const report = require('yurnalist');
const setupLambdaLocal = require('./utils/setupLambdaLocal');

require('yargs').command(
  '$0',
  'Initialize a Lambda Application with best practices',
  () => {},
  async () => {
    report.info('Initialization of Lambda application started');
    await setupLambdaLocal();
  },
).argv;
