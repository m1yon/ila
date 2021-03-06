const util = require('util');
const fs = require('fs').promises;
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async ({ ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Installing jest');

  // install jest package
  await exec(ts ? 'npm i -D jest@26.1.0 ts-jest@26.1.1' : 'npm i -D jest@latest');

  // prettier config
  await fs.writeFile(
    'jest.config.js',
    Buffer.from(`module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['<rootDir>/events/'],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  ${
    ts
      ? `preset: 'ts-jest',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  testMatch: ['<rootDir>/__tests__/**/*.test.(j|t)s'],`
      : ''
  }
};
`),
  );
  spinner.end();
  reporter.success('jest installed');
};
