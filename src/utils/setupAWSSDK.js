const report = require('yurnalist');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Installing aws-sdk');
  await exec('npm i aws-sdk');
  spinner.end();
  report.success('aws-sdk installed');
};
