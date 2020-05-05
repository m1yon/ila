const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async ({ ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Creating test events');

  const testEvent = `module.exports = {
  test: 'event',
};
`;

  const jestEvent = `${ts ? 'export default' : 'module.exports ='} {
    test: 'event',
};
`;

  // write new files
  await fs.mkdir('events').catch(() => {});
  await fs.writeFile('events/testEvent.js', testEvent);
  await fs.writeFile(`events/jestEvent.${ts ? 'ts' : 'js'}`, jestEvent);

  spinner.end();
  reporter.success('test events created');
};
