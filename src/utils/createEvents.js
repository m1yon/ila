const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating test events');

  const testEvent = `module.exports = {
  test: 'event',
};
`;

  const jestEvent = `module.exports = {
    test: 'event',
  };
  `;

  // write new files
  await fs.mkdir('events').catch(() => {});
  await fs.writeFile('events/testEvent.js', testEvent);
  await fs.writeFile('events/jestEvent.js', jestEvent);

  spinner.end();
  reporter.success('test events created');
};
