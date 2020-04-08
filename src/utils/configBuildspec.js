const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Configuring buildspec.yml');

  // get current buildspec.yml
  const buildspec = await fs.readFile('./buildspec.yml').then((data) => data.toString());

  // add overrides
  const buildspecConfigured = buildspec.replace('npm run test', 'npm run coverage');

  // write new file
  await fs.writeFile('buildspec.yml', buildspecConfigured);

  spinner.end();
  reporter.success('buildspec.yml configured');
};
