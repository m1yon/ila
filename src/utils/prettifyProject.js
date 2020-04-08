const report = require('yurnalist');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Prettifying project');

  // install eslint/prettier packages
  await exec('npm run prettier');

  spinner.end();
  report.success('Project prettified');
};
