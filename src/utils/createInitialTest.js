const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async ({ ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Creating initial test');

  const test = `import { handler } from '../src/index';
import event from '../events/jestEvent';

it('returns the correct value', async () => {
  const result = await handler(event);
  
  expect(result).toBe(4);
})
`;

  // write new file
  await fs.writeFile(`__tests__/index.test.${ts ? 'ts' : 'js'}`, test);

  spinner.end();
  reporter.success('Initial test created');
};
