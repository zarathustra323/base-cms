const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const pump = require('pump');
const { src } = require('gulp');
const completeTask = require('@base-cms/cli-utils/task-callback');

module.exports = (cwd, options) => (cb) => {
  pump([
    src(['**/*.js'], { cwd }),
    cache('basecms-exports-lint-js'),
    eslint(options),
    eslint.results((results, lintCb) => {
      lintCb();
      cb();
    }),
    eslint.format(),
  ], e => completeTask(e, cb));
};
