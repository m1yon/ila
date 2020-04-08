const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Installing husky');

  // install jest package
  await exec('npm -D i husky lint-staged');

  spinner.end();
  reporter.success('husky installed');
};
