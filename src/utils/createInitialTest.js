const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating initial test');

  const test = `const { handler } = require('../src/index');

it('returns the correct value', async () => {
  expect(await handler({ my: 'test' })).toMatchObject({ my: 'test' });
})
`;

  // write new file
  await fs.writeFile('__tests__/index.test.js', test);

  spinner.end();
  reporter.success('Initial test created');
};
