/**
 * Wrapper reporter to support multiple reporters.
 *
 * Courtesy of http://wookieb.pl/multiple-testresultsprocessors-with-jest/
 */
module.exports = function() {
  require('../node_modules/jest-html-reporter').apply(this, arguments);
  return require('../node_modules/jest-junit').apply(this, arguments);
};
