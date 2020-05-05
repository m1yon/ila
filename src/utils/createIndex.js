const fs = require('fs').promises;
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async ({ ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick(`Creating index.${ts ? 'ts' : 'js'}`);

  const index = ts
    ? `import 'regenerator-runtime/runtime';
  import aws from 'aws-sdk';

  aws.config.update({ region: 'us-east-1' });
  
  type inputTypes = {
    test: string;
  };
  
  export const handler = async (event: inputTypes) => {
    return event;
  };
  `
    : `import 'regenerator-runtime/runtime';
  import aws from 'aws-sdk';

aws.config.update({ region: 'us-east-1' });

export const handler = async (event) => {
  return event;
};
`;

  // write new file
  await fs.writeFile(`src/index.${ts ? 'ts' : 'js'}`, index);

  // remove boilerplate junk
  await exec('rm -rf ./src/handlers');
  await exec('rm -rf ./__tests__/*');

  spinner.end();
  reporter.success(`index.${ts ? 'ts' : 'js'} created`);
};
