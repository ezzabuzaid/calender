const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

gulp.task('styles', function () {
    return gulp.src('./src/sass/styles.scss')
        // Compile SASS files
        .pipe(sass({
            outputStyle: 'nested',
            precision: 10,
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({ browsers: AUTOPREFIXER_BROWSERS }))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'))
});