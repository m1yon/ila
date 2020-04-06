const report = require('yurnalist');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Installing lambda-local');
  await exec('npm i -D lambda-local');
  spinner.end();
  report.success('lambda-local installed');
};
