const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating index.js');

  const index = `const aws = require('aws-sdk');

aws.config.update({ region: 'us-east-1' });

exports.handler = async (event) => {
  return event;
};
`;

  // write new file
  await fs.writeFile('src/index.js', index);

  // remove boilerplate junk
  await exec('rm -rf ./src/handlers');
  await exec('rm -rf ./__tests__/*');

  spinner.end();
  reporter.success('index.js created');
};
