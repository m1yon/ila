const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Installing lambda-local');
  await exec('npm i -D lambda-local');
  spinner.end();
  reporter.success('lambda-local installed');
};
