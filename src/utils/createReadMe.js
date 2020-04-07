const report = require('yurnalist');
const fs = require('fs').promises;

module.exports = async () => {
  const spinner = report.activity();
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
  report.success('README.md created');
};
