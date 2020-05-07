const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async ({ author, ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Configuring package.json');

  // get current package.json
  const packageJSON = await fs
    .readFile('./package.json')
    .then((data) => JSON.parse(data.toString()));

  // add overrides
  const packageJSONConfigured = {
    ...packageJSON,
    author,
    scripts: {
      start: `${
        ts ? 'npx tsc && ' : ''
      }npm run build && lambda-local -l ./lib/index.js -h handler -e ${
        ts ? './dist/events/testEvent.js' : './events/testEvent.js'
      } -t 60`,
      build: `babel ./src --out-dir lib --extensions '.js,.ts,.tsx'`,
      'check-types': 'npx tsc --noEmit',
      test: `${ts ? 'npm run check-types && ' : ''}jest --watchAll`,
      coverage: `${ts ? 'npm run check-types && ' : ''}jest --coverage`,
      'test:ci': `${ts ? 'npm run check-types && ' : ''}jest --watchAll=false`,
      prettier: 'prettier --write .',
    },
    husky: {
      hooks: {
        'pre-commit': 'npm run test:ci && lint-staged',
        'pre-push': 'npm run coverage',
      },
    },
    'lint-staged': {
      '*.js': 'eslint --cache --fix',
    },
  };

  // write new file
  await fs.writeFile('package.json', JSON.stringify(packageJSONConfigured));

  spinner.end();
  reporter.success('package.json configured');
};
