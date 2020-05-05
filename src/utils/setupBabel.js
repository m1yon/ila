const util = require('util');
const fs = require('fs').promises;
const exec = util.promisify(require('child_process').exec);
const reporter = require('./reporter');

const setupBabel = async ({ ts } = {}) => {
  const spinner = reporter.activity();

  spinner.tick('Installing and configuring babel');

  // install regenerator runtime for async/await
  await exec('npm i regenerator-runtime --save-prod');

  // install babel packages
  await exec(
    `npm i -D @babel/cli @babel/core @babel/preset-env ${
      ts
        ? '@babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread @babel/preset-typescript babel-jest'
        : ''
    }`,
  );

  // prettier config
  await fs.writeFile(
    '.babelrc.json',
    `
  {
    "presets": [[
      "@babel/env",
      {
        "targets": {
          "esmodules": false,
          "node": "10"
        }
      }
    ]${ts ? ', "@babel/preset-typescript"' : ''}
  ],
    ${
      ts
        ? '"plugins": ["@babel/proposal-class-properties", "@babel/proposal-object-rest-spread"]'
        : ''
    }
  }
`,
  );

  spinner.end();

  reporter.success('babel installed and configured');
};

module.exports = setupBabel;
