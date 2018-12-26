const gulp = require("gulp");
const del = require('del');

module.exports = () => gulp.task('clean', () => del(['dist']));