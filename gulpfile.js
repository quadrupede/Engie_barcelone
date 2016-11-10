/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @authors Florian Panchout
 * @package wp-gulp-theme
 */


// Project configuration

// Load plugins
var gulp     = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
	minifycss    = require('gulp-uglifycss'),
	rename       = require('gulp-rename'),
	runSequence  = require('gulp-run-sequence'),
	sass         = require('gulp-sass'),
	plugins      = require('gulp-load-plugins')({ camelize: true }),
	plumber      = require('gulp-plumber'), // Helps prevent stream crashing on errors
	watch 		 = require('gulp-watch');



/**
 * Styles
 *
 * Take all scss files, process, concat, minify, autoprefix and send theme to build
*/
gulp.task('styles', function () {
	return 	gulp.src('./assets/scss/*.scss')
			.pipe(plumber())
			.pipe(sass({
				errLogToConsole: true,
				outputStyle: 'compact',
				precision: 10
			}))
			.pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(minifycss({
				maxLineLen: 80
			}))
			.pipe(rename('style.css'))
			.pipe(plumber.stop())
			.pipe(gulp.dest('./assets/css'))
});



gulp.task('default', function () {
    watch('./assets/scss/**/*.scss', function () {
    	runSequence('styles');
    });
    runSequence('styles');
});
