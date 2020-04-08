const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Prettifying project');

  // install eslint/prettier packages
  await exec('npm run prettier');

  spinner.end();
  reporter.success('Project prettified');
};
