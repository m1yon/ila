const util = require('util');
const fs = require('fs').promises;
const exec = util.promisify(require('child_process').exec);

const reporter = require('./reporter');

module.exports = async () => {
  const spinner = reporter.activity();
  spinner.tick('Configuring eslint/prettier');

  // install eslint/prettier packages
  await exec(
    'npm -D i babel-eslint eslint eslint-config-airbnb eslint-config-prettier eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react prettier',
  );

  // prettier config
  await fs.writeFile(
    '.prettierrc.js',
    Buffer.from(`module.exports = {
  "printWidth": 100,
  "singleQuote": true,
  "trailingComma": "all"
}
  `),
  );

  // prettierignore config
  await fs.writeFile(
    '.prettierignore',
    Buffer.from(`node_modules
coverage
  `),
  );

  // eslint config
  await fs.writeFile(
    '.eslintrc.js',
    Buffer.from(`module.exports = {
  "extends": [
    "airbnb",
    "plugin:prettier/recommended",
    "prettier/react"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "jest": true,
    "node": true
  },
  "settings": {
    "import/core-modules": ["aws-sdk"]
  },
  "rules": {
    "jsx-a11y/href-no-hash": ["off"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "max-len": [
      "warn",
      {
        "code": 100,
        "tabWidth": 2,
        "comments": 100,
        "ignoreComments": false,
        "ignoreTrailingComments": true,
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreRegExpLiterals": true
      }
    ]
  }
}
    `),
  );

  spinner.end();
  reporter.success('eslint/prettier configured');
};
