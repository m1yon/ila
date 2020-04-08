#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const emoji = require('node-emoji');
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
const createReadMe = require('./utils/createReadMe');
const createInitialTest = require('./utils/createInitialTest');
const prettifyProject = require('./utils/prettifyProject');

const reporter = require('./utils/reporter');

require('yargs').command(
  '$0',
  'Initialize a Lambda Application with best practices',
  () => {},
  async () => {
    reporter.info(
      `${emoji.get('wave')} Hi I'm ILA, I heard you need help initializing your Node Lambda.`,
    );

    const result = await reporter.select(
      `${emoji.get('thinking_face')} is this a fresh project or an existing project?`,
      'Answer (1 or 2)',
      [
        {
          name: 'Fresh project',
          value: 'fresh',
        },
        {
          name: 'Existing project',
          value: 'existing',
        },
      ],
    );

    if (result === 'existing') {
      reporter.info(
        `${emoji.get(
          'disappointed',
        )} You should only ask for my help with fresh projects, I might accidentally delete your work.`,
      );
      return;
    }

    reporter.info(`${emoji.get('blush')} Cool, let's get started!`);

    try {
      await setupLambdaLocal();
      await setupAWSSDK();
      await configBuildspec();
      await configTemplate();
      await createIndex();
      await createEvent();
      await setupJest();
      await createInitialTest();
      await setupHusky();
      await configGitIgnore();
      await createReadMe();
      await setupEslintPrettier();
      await configPackageJSON();
      await prettifyProject();
    } catch (e) {
      reporter.error(e);
      process.exit(0);
    }

    reporter.info(
      `${emoji.get('blush')} You're all set to go, check out the README for a list of commands!`,
    );
    reporter.warn(`Make sure you edit/delete your permissions boundary inside the console.`);
  },
).argv;
