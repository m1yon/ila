const util = require('util');
const fs = require('fs').promises;
const exec = util.promisify(require('child_process').exec);
const reporter = require('./reporter');

const setupTypeScript = async () => {
  const spinner = reporter.activity();

  spinner.tick('Installing and configuring typescript');

  // install babel packages
  await exec(`npm i -D typescript @types/jest @types/node`);

  // prettier config
  await fs.writeFile(
    'tsconfig.json',
    `{
    "compilerOptions": {
      "target": "ES2017",
      "module": "commonjs",
      "allowJs": false,
      "strict": true,
      "outDir": "dist",
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true
    }
  }
`,
  );

  spinner.end();

  reporter.success('typescript installed and configured');
};

module.exports = setupTypeScript;
