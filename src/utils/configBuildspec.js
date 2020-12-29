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
      `- rimraf ./__tests__
      - rimraf ./events
      - rimraf ./dist
      - rimraf ./src
      - rimraf ./coverage
      - rimraf .babelrc.json
      - rimraf .eslintrc.js
      - rimraf .gitignore
      - rimraf .prettierignore
      - rimraf .prettierrc.js
      - rimraf jest.config.js
      - rimraf README.md
      - rimraf tsconfig.json`,
    )
    .replace('all unit tests', 'bloat');

  // write new file
  await fs.writeFile('buildspec.yml', buildspecConfigured);

  spinner.end();
  reporter.success('buildspec.yml configured');
};
