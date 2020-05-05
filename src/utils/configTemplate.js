const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async ({ author, ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Configuring template.yml');

  // get current template.yml
  const template = await fs.readFile('./template.yml').then((data) => data.toString());

  // add overrides
  const templateConfigured = `${template
    .replace('helloFromLambdaFunction', 'function')
    .replace('src/handlers/hello-from-lambda.helloFromLambdaHandler', 'lib/index.handler')
    .replace('helloFromLambda', 'function')}      Tags:
        Author: ${author}
`;

  // write new file
  await fs.writeFile('template.yml', templateConfigured);

  spinner.end();
  reporter.success('template.yml configured');
};
