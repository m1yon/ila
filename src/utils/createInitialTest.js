const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Creating initial test');

  const test = `const { handler } = require('../src/index');
const event = require('../events/jestEvent');

it('returns the correct value', async () => {
  const result = await handler(event);
  
  expect(result).toStrictEqual({ test: 'event' });
})
`;

  // write new file
  await fs.writeFile('__tests__/index.test.js', test);

  spinner.end();
  reporter.success('Initial test created');
};
