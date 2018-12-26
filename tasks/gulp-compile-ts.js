const gulp = require("gulp");
const gutil = require('gulp-util');
const browserify = require("browserify");
const tsify = require("tsify");
const source = require('vinyl-source-stream');
const { paths } = require('./gulp.config');

module.exports = () => gulp.task('compile-ts', () => {
    return browserify({
        entries: [paths.tsEntry],
    })
        .plugin(tsify)
        .bundle()
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
})
