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

const reporter = require('./reporter');

const initializeJavaScript = async (author) => {
  try {
    await setupLambdaLocal();
    await configBuildspec();
    await configTemplate({ author });
    await createIndex();
    await createEvents();
    await setupJest();
    await createInitialTest();
    await setupHusky();
    await configGitIgnore();
    await createReadMe();
    await setupEslintPrettier();
    await configPackageJSON({ author });
    await setupBabel();
    await prettifyProject();
  } catch (e) {
    reporter.error(e);
    process.exit(0);
  }
};

module.exports = initializeJavaScript;
