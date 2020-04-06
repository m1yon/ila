const report = require('yurnalist');
const util = require('util');
const fs = require('fs').promises;

const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Installing jest');

  // install jest package
  await exec('npm -D i jest');

  // prettier config
  await fs.writeFile(
    'jest.config.js',
    Buffer.from(`module.exports = {
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
`),
  );
  spinner.end();
  report.success('jest installed');
};
