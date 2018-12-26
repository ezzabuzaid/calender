const gulp = require("gulp");
const buffer = require('vinyl-buffer');

require('./tasks/gulp-compile-ts')();
require('./tasks/gulp-clean')();
require('./tasks/gulp-minify-js')();
const TASK_LIST = ['clean', 'compile-ts', ['minify-compress']];
const sugar = (...a) => gulp.series(...a.map((i) => Array.isArray(i) ? gulp.parallel(...i) : i));


gulp.task("default", sugar(...TASK_LIST));

// task('watch', function () {
//     watch('src/**/*.ts', TASK_LIST);
//     watch('src/**/*.css', TASK_LIST);
//     watch('src/**/*.html', TASK_LIST);
// });
// task('stream', function () {
//     return watch('src/**/*.ts', {
//         ignoreInitial: false
//     });
// });

// {del} :: https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

