const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Configuring buildspec.yml');

  // get current buildspec.yml
  const buildspec = await fs.readFile('./buildspec.yml').then((data) => data.toString());

  // add overrides
  const buildspecConfigured = buildspec
    .replace(
      '- npm run test',
      `- npm run coverage
      - npm run build`,
    )
    .replace(
      '- rm -rf ./__tests__',
      `- npx rimraf ./__tests__
      - npx rimraf ./events
      - npx rimraf ./dist
      - npx rimraf ./src
      - npx rimraf ./coverage
      - npx rimraf .babelrc.json
      - npx rimraf .eslintrc.js
      - npx rimraf .gitignore
      - npx rimraf .prettierignore
      - npx rimraf .prettierrc.js
      - npx rimraf jest.config.js
      - npx rimraf README.md
      - npx rimraf tsconfig.json`,
    )
    .replace('all unit tests', 'bloat');

  // write new file
  await fs.writeFile('buildspec.yml', buildspecConfigured);

  spinner.end();
  reporter.success('buildspec.yml configured');
};
