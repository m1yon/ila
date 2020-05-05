const setupLambdaLocal = require('./setupLambdaLocal');
const setupJest = require('./setupJest');
const setupEslintPrettier = require('./setupEslintPrettier');
const setupHusky = require('./setupHusky');
const configPackageJSON = require('./configPackageJSON');
const configBuildspec = require('./configBuildspec');
const configTemplate = require('./configTemplate');
const createEvents = require('./createEvents');
const createIndex = require('./createIndex');
const configGitIgnore = require('./configGitIgnore');
const createReadMe = require('./createReadMe');
const createInitialTest = require('./createInitialTest');
const prettifyProject = require('./prettifyProject');
const setupBabel = require('./setupBabel');
const setupTypeScript = require('./setupTypeScript');

const reporter = require('./reporter');

const initializeTypeScript = async (author) => {
  try {
    await setupLambdaLocal();
    await configBuildspec();
    await configTemplate({ author, ts: true });
    await createIndex({ ts: true });
    await createEvents({ ts: true });
    await setupJest({ ts: true });
    await createInitialTest({ ts: true });
    await setupHusky();
    await configGitIgnore();
    await createReadMe();
    await setupEslintPrettier({ ts: true });
    await configPackageJSON({ author });
    await prettifyProject();
    await setupBabel({ ts: true });
    await setupTypeScript({ ts: true });
  } catch (e) {
    reporter.error(e);
    process.exit(0);
  }
};

module.exports = initializeTypeScript;
