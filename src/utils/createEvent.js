const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating event.js');

  // add overrides
  const eventJSONConfigured = `module.exports = {
  test: 'event',
};
`;

  // write new file
  await fs.writeFile('event.js', eventJSONConfigured);

  spinner.end();
  reporter.success('event.js created');
};
