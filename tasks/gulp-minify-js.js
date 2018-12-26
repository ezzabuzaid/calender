const gulp = require("gulp");
const minifyJS = require('gulp-minify'); // will create to file for min and unmin
const uglify = require('gulp-uglify-es').default;
const { paths } = require('./gulp.config');

module.exports = () => gulp.task('minify-compress', () => {
    return gulp.src(paths.scripts)
        // .pipe(minifyJS())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});