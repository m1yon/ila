const report = require('yurnalist');
const fs = require('fs').promises;

module.exports = async () => {
  const spinner = report.activity();
  spinner.tick('Configuring template.yml');

  // get current template.yml
  const template = await fs.readFile('./template.yml').then((data) => data.toString());

  // add overrides
  const templateConfigured = template
    .replace('src/handlers/helloFromLambda', 'src/index.handler')
    .replace('helloFromLambda', 'function');

  // write new file
  await fs.writeFile('template.yml', templateConfigured);

  spinner.end();
  report.success('template.yml configured');
};
