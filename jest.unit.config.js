const path = require('path');
const fse = require('fs-extra');
const IS_CI = require('is-ci');

const REPORTS_BASE_FOLDER = 'test_results/unit';

const jestConfig = {
  "roots": ["<rootDir>/src"],
  "globals": {
    "ts-jest": {
      "skipBabel": true
    }
  },
  "transform": {
    ".(ts|tsx)": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
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
    mapCoverage: true,
    collectCoverage: true,
    collectCoverageFrom : ["src/**/*.{js,jsx,ts}"],
    coverageDirectory: `${REPORTS_BASE_FOLDER}/coverage`,
    coverageReporters: ['html', 'lcovonly'],
    testResultsProcessor: './test_helpers/jest_multiple_reporters.js'
  })
}

module.exports = jestConfig;
