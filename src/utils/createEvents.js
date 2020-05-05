const fs = require('fs').promises;

const reporter = require('./reporter');

module.exports = async ({ ts } = {}) => {
  const spinner = reporter.activity();
  spinner.tick('Creating test events');

  const testEvent = `module.exports = {
  a: 2,
  b: 2,
};
`;

  const jestEvent = ts
    ? `import { eventType } from '../events/event.d';

const event: eventType = {
  a: 2,
  b: 2,
};
  
export default event;
`
    : `module.exports = {
  a: 2,
  b: 2,
};
`;

  const eventDefinition =
    ts &&
    `export type eventType = {
  a: number;
  b: number;
};
`;

  // write new files
  await fs.mkdir('events').catch(() => {});
  await fs.writeFile('events/testEvent.js', testEvent);
  await fs.writeFile(`events/jestEvent.${ts ? 'ts' : 'js'}`, jestEvent);
  if (ts) await fs.writeFile('events/event.d.ts', eventDefinition);

  spinner.end();
  reporter.success('test events created');
};
