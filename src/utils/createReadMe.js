const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating README.md');

  // add overrides
  const readMe = `# Created with ILA

## Scripts

- **start** - runs the Lambda using events/testEvent.js as input
- **test** - runs the Jest test suite in watch mode
- **coverage** - generate coverage report via Jest
- **test:ci** - runs the Jest test suite

## Permissions Boundary and Roles

By default, AWS will give your Lambda function a default role and slap a permissions boundary over the entire permissions Lambda Application. **A Lambda Application initialized with ILA should only have 1 Lambda in it and that's it, no other resources**. Therefore it's recommended you just **remove the permissions boundary** and put any permissions you want the Lambda Application to have on the Lambda function's role.
`;

  // write new file
  await fs.writeFile('README.md', readMe);

  spinner.end();
  reporter.success('README.md created');
};
