var gulp = require('gulp');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var streamify = require('gulp-streamify');
var babel = require('gulp-babel');
var rename = require('gulp-rename');
var copy = require('gulp-copy');
var notify = require('gulp-notify');
var browserify = require('browserify');

var basePath = {
	src: 'source/',
	dest: 'dist/'
};

var srcAssets = {
	scripts: basePath.src + 'js/',
	styles: basePath.src + 'scss/',
	templates: basePath.src + 'templates/',
	images: basePath.src + 'images/'
};

var destAssets = {
	scripts: basePath.dest + 'js/',
	styles: basePath.dest + 'css/',
	templates: basePath.dest + 'templates/',
	images: basePath.dest + 'images/'
};

gulp.task('scripts', function() {
	var bundleStream = browserify(srcAssets.scripts+'main.js', {
		// standalone: 'Wchat',
		debug: true
	}).bundle();

	bundleStream
	.pipe(source(srcAssets.scripts+'main.js'))
	.pipe(rename('main.js'))
	.pipe(gulp.dest(destAssets.scripts))
	.pipe(streamify(babel({presets: ['babili']})))
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(destAssets.scripts))
	.pipe(notify({ message: 'scripts task complete' }));
});

gulp.task('styles', function() {
	return gulp.src(srcAssets.styles+'*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest(destAssets.styles))
	.pipe(notify({ message: 'styles task complete' }));
});

gulp.task('templates', function() {

	gulp.src(basePath.src+'*.html')
	.pipe(gulp.dest(basePath.dest));

	gulp.src(srcAssets.templates+'*.html')
	.pipe(gulp.dest(destAssets.templates));

});

gulp.task('build', function() {
	gulp.start('scripts', 'styles', 'templates');
});

gulp.task('default', function() {
	gulp.start('build');
});
