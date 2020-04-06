const report = require('yurnalist');
const fs = require('fs').promises;

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Creating event.js');

  // add overrides
  const eventJSONConfigured = `module.exports = {
  test: 'event',
};
`;

  // write new file
  await fs.writeFile('event.js', eventJSONConfigured);

  spinner.end();
  report.success('event.js created');
};
