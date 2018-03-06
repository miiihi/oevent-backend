const path = require('path');
const fse = require('fs-extra');
const IS_CI = require('is-ci');

const REPORTS_BASE_FOLDER = 'test_results/e2e';

const jestConfig = {
  "roots": ["<rootDir>/e2e_tests"],
  "globals": {
    "ts-jest": {
      "skipBabel": true
    }
  },
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/e2e_tests\/.*\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ]
};

if (IS_CI) {
  // do the cleanup
  try {
    fse.removeSync(path.resolve(__dirname, REPORTS_BASE_FOLDER));
  } catch (e) {}

  Object.assign(jestConfig, {
    testResultsProcessor: './test_helpers/jest_multiple_reporters.js'
  });

  process.env.BASE_URL = process.env.E2E_BASE_URL;
} else {
  process.env.BASE_URL = process.env.BASE_URL || 'http://localhost:7770';
}

module.exports = jestConfig;
