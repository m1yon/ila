const report = require('yurnalist');
const fs = require('fs').promises;

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Configuring .gitignore');

  // add overrides
  const gitIgnoreConfigured = `node_modules
coverage
.eslintcache
`;

  // write new file
  await fs.writeFile('.gitignore', gitIgnoreConfigured);

  spinner.end();
  report.success('.gitignore configured');
};
