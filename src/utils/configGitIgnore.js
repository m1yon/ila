const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Configuring .gitignore');

  // add overrides
  const gitIgnoreConfigured = `node_modules
coverage
.eslintcache
`;

  // write new file
  await fs.writeFile('.gitignore', gitIgnoreConfigured);

  spinner.end();
  reporter.success('.gitignore configured');
};
