var gulp       = require('gulp');
var jshint     = require('gulp-jshint');
var less       = require('gulp-less');
var minifycss  = require('gulp-minify-css');
var mocha      = require('gulp-mocha');
var uglify     = require('gulp-uglify');

var browserify = require('browserify');
var del        = require('del');
var stylish    = require('jshint-stylish');
var reactify   = require('reactify');
var buffer     = require('vinyl-buffer');
var vinyl      = require('vinyl-source-stream');


var paths = {
	assets: [
		'./app/img/**/*.*',
		'./app/index.html'
	],
	app: './app',
	dist: './dist',
	css: './app/less/main.less',
	js: './app/js/app.js',
	test: './test/**/*-spec.js',
	lintme: './app/js/**/*.js'
};

gulp.task('clean', function(cb) {
	del(paths.dist, cb);
});

gulp.task('copy-assets', function() {
	return gulp.src(paths.assets, {base: paths.app})
		.pipe(gulp.dest(paths.dist));
});

gulp.task('compile-css', function() {
	return gulp.src(paths.css)
		.pipe(less())
		.pipe(minifycss())
		.pipe(gulp.dest(paths.dist));
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

gulp.task('lint', function() {
	return gulp.src(paths.lintme)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});

gulp.task('test', ['lint'], function() {
	return gulp.src(paths.test)
		.pipe(mocha());
});

gulp.task('default', ['clean', 'test'], function() {
	gulp.start('copy-assets', 'compile-css', 'compile-js');
});
