const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating README.md');

  // add overrides
  const readMe = `# Created with ILA

## Scripts

- **start** - builds and runs the Lambda using events/testEvent.js as input
- **build** - builds the production build via Babel
- **check-types** - runs code through the TypeScript to check for any errors
- **test** - checks types then runs the Jest test suite in watch mode
- **coverage** - checks types then generates coverage report via Jest
- **test:ci** - checks types then runs the Jest test suite

## Permissions Boundary and Roles

By default, AWS will give your Lambda function a default role and slap a permissions boundary over the entire Lambda Application, limiting the permissions of everything inside. **A Lambda Application initialized with ILA should only have 1 Lambda in it and that's it, no other resources**. Therefore it's recommended you just **remove the permissions boundary** and put any permissions you want the Lambda Application to have directly on the Lambda function's role.
`;

  // write new file
  await fs.writeFile('README.md', readMe);

  spinner.end();
  reporter.success('README.md created');
};
