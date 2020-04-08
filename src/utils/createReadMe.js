const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating README.md');

  // add overrides
  const readMe = `# Created with ILA
## Scripts
- **start** - runs the Lambda using event.js as input
- **test** - runs the Jest test suite in watch mode
- **coverage** - generate coverage report via Jest
- **test:ci** - runs the Jest test suite
`;

  // write new file
  await fs.writeFile('README.md', readMe);

  spinner.end();
  reporter.success('README.md created');
};
