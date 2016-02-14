var gulp = require('gulp'),
    connect = require('gulp-connect'),
    webserver = require('gulp-webserver');

// Develop Web Server
gulp.task('devWebServer', function() {
  gulp.src('app')
      .pipe(webserver({
        root: './app',
        hostname: '0.0.0.0',
        livereload: true,
        directoryListing: false,
        open: true
      }));
});

// Styles preprocessor
var stylus = require('gulp-stylus'),
    nib = require('nib'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return
    gulp.src('./app/scripts/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// Stylus files to CSS
gulp.task('css', function () {
  gulp.src('./app/stylesheets/main.styl')
      .pipe(stylus({use: [nib()]}))
      .pipe(gulp.dest('./app/stylesheets'));
});

// Reload navigator on HTML changes
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
      .pipe(connect.reload());
});

var inject = require('gulp-inject');
var wiredep = require('wiredep').stream;

// Inject the css and js files in the index.html
gulp.task('inject', function() {
  var sources = gulp.src(['./app/scripts/**/*.js', './app/stylesheets/**/*.css'], {read: false});
  return gulp.src('./app/index.html')
            .pipe(inject(sources, {
              read: false,
              ignorePath: '/app'
            }))
            .pipe(gulp.dest('./app'));
});

// Inject the Bower installed libraries
gulp.task('wiredep', function () {
  gulp.src('./app/index.html')
      .pipe(wiredep({
        directory: './app/lib'
      }))
      .pipe(gulp.dest('./app'));
});

// Watcher to launch the appropiate tasks
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/*.styl'], ['css','inject']);
  gulp.watch(['./app/scripts/**/*.js', './Gulpfile.js'], ['jshint','inject']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

//Default task
gulp.task('default', ['devWebServer', 'inject', 'wiredep', 'watch']);
