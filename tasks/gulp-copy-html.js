
gulp.task('copy-html', () => {
    return gulp.src('./src/index.html')
        .pipe(gulpCopy('dist/', { prefix: 1 }))
        .pipe(gulp.dest('dist'));
});