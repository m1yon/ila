const fs = require('fs').promises;
const check = require('check-node-version');
const reporter = require('./reporter');

module.exports = async () => {
  // check if node is up to date
  await new Promise((resolve, reject) => {
    check(
      { node: '>= 10.0' },
      (
        error,
        {
          versions: {
            node: { isSatisfied },
          },
        },
      ) => {
        if (!isSatisfied) reject(new Error('Node version must be >= v10.0.0'));
        resolve();
      },
    );
  }).catch((e) => {
    reporter.error(e);
    process.exit(1);
  });

  await fs.open('package.json', 'r').catch(() => {
    reporter.error('package.json not found');
    reporter.error(`Make sure you're in the root of a Lambda Application`);
    process.exit(1);
  });
};
