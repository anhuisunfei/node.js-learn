var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss = require('gulp-minify-css'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	rename = require('gulp-rename'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	cache = require('gulp-cache'),
	nodemon = require('gulp-nodemon'),
	refresh = require('gulp-livereload'),
	livereload = require('connect-livereload'),
	_config = {
		cssPath: 'app/public/css/common.css',
		cssDist: 'build/public/css',
		jsPath: 'app/public/js/*.js',
		jsDist: 'build/public/js',
		imagePath: 'app/public/assets/images/*',
		imageDist: 'build/public/assets/images'
	}

var expressServer = require('./app.js');
gulp.task('serve_', function() {
	console.log('Server');
	expressServer.startServer();
});

gulp.task('serve', function() {
	nodemon({
			script: 'app.js',
			ext: 'json js',
			ignore: ['app/public/*']
		})
		.on('change', ['lint'])
		.on('restart', function() {
			console.log('Restarted webserver')
		});
});


gulp.task('lint', function() {
	gulp.src('app/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('styles', function() {
	return gulp.src(_config.cssPath)
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('build/public/assets/css'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest(_config.cssDist))
		.pipe(notify({
			message: 'Styles task complete'
		}));
});

gulp.task('scripts', function() {
	return gulp.src(_config.jsPath)
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('default'))
		.pipe(concat('main.js'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest(_config.jsDist))
		.pipe(notify({
			message: 'Scripts task complete'
		}));
});

gulp.task('images', function() {
	return gulp.src(_config.imagePath)
		.pipe(cache(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		})))
		.pipe(gulp.dest(_config.imageDist))
		.pipe(notify({
			message: 'Images task complete'
		}));
});

gulp.task('clean', function() {
	return gulp.src(['build/'], {
			read: false
		})
		.pipe(clean());
});


// 预设任务
gulp.task('default', ['clean'], function() {
	gulp.start('watch')
	// gulp.start('styles', 'scripts', 'images','watch');
});


gulp.task('watch',['serve','lint'], function() {
	refresh.listen();
	gulp.watch(_config.cssPath, ['styles']);
	gulp.watch(_config.jsPath, ['scripts']);
	gulp.watch(_config.imagePath, ['images']);
	 
	gulp.watch(['app/**/*.js',"!app/public/*.js"]).on('change', function(file) {
		console.log(file);
		refresh.changed(file.path);
	});

});