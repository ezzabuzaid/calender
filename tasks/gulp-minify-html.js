const htmlmin = require('gulp-htmlmin');
const { paths } = require('./gulp.config');

gulp.task('minify-html', () => {
    return gulp.src(paths.pages)
        .pipe(htmlmin({ collapseWhitespace: true, useShortDoctype: true, removeStyleLinkTypeAttributes: true, removeComments: true }))
        .pipe(gulp.dest('dist'));
});