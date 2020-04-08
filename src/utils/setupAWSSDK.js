const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Installing aws-sdk');
  await exec('npm i aws-sdk');
  spinner.end();
  reporter.success('aws-sdk installed');
};
