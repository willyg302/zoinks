var gulp       = require('gulp');
var stylus     = require('gulp-stylus');
var uglify     = require('gulp-uglify');

var browserify = require('browserify');
var del        = require('del');
var reactify   = require('reactify');
var buffer     = require('vinyl-buffer');
var vinyl      = require('vinyl-source-stream');


var paths = {
	assets: [
		//'./app/img/**/*.*',
		'./app/index.html'
	],
	app: './app',
	dist: './dist',
	css: ['src/css/**/*.styl'],
	js: './app/js/app.js'
};

gulp.task('clean', function(cb) {
	del(paths.dist, cb);
});

gulp.task('copy-assets', function() {
	return gulp.src(paths.assets, {base: paths.app})
		.pipe(gulp.dest(paths.dist));
});

gulp.task('compile-css', function() {
	/*
	return gulp.src(paths.css)
		.pipe(stylus())
		.pipe(gulp.dest(paths.dist));*/
});

gulp.task('compile-js', function() {
	return browserify(paths.js)
		.transform(reactify)
		.bundle()
		.pipe(vinyl('main.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['clean'], function() {
	gulp.start('copy-assets', 'compile-css', 'compile-js');
});
