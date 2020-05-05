#!/usr/bin/env node
/* eslint-disable no-unused-expressions */
const emoji = require('node-emoji');
const checkPrerequisites = require('./utils/checkPrerequisites');
const initializeTypeScript = require('./utils/initializeTypeScript');
const initializeJavaScript = require('./utils/initializeJavaScript');

const reporter = require('./utils/reporter');

require('yargs').command(
  '$0',
  'Initialize a Lambda Application with best practices',
  () => {},
  async () => {
    await checkPrerequisites();

    reporter.info(
      `${emoji.get('wave')} Hi I'm ILA, I heard you need help initializing your Node Lambda.`,
    );

    const projectResult = await reporter.select(
      `${emoji.get('thinking_face')} Is this a fresh project or an existing project?`,
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

    if (projectResult === 'existing') {
      reporter.info(
        `${emoji.get(
          'disappointed',
        )} You should only ask for my help with fresh projects, I might accidentally delete your work.`,
      );
      return;
    }

    const templateResult = await reporter.select(
      `${emoji.get('thinking_face')} Which template would you like to use?`,
      'Answer (1 or 2)',
      [
        {
          name: 'TypeScript',
          value: 'ts',
        },
        {
          name: 'JavaScript',
          value: 'js',
        },
      ],
    );

    const author = await reporter.question(
      `${emoji.get('thinking_face')} What's your name (for tagging purposes)?`,
    );

    reporter.info(`${emoji.get('blush')} Cool, let's get started!`);

    if (templateResult === 'ts') await initializeTypeScript(author);
    if (templateResult === 'js') await initializeJavaScript(author);

    reporter.info(
      `${emoji.get('blush')} You're all set to go, check out the README for a list of commands!`,
    );
    reporter.warn(`Make sure you edit/delete your permissions boundary inside the console.`);
  },
).argv;
