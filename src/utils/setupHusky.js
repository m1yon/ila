const report = require('yurnalist');
const util = require('util');

const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Installing husky');

  // install jest package
  await exec('npm -D i husky lint-staged');

  spinner.end();
  report.success('husky installed');
};
