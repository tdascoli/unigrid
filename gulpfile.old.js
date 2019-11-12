var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    package = require('./package.json');


    var banner = [
      '/*!\n' +
      ' * <%= package.name %>\n' +
      ' * <%= package.title %>\n' +
      ' * <%= package.homepage %>\n' +
      ' * @author <%= package.author %>\n' +
      ' * @version <%= package.version %>\n' +
      ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
      ' */',
      '\n'
    ].join('');

    // BrowserSync Reload
    function reload(done) {
      browserSync.reload();
      done();
    }

    gulp.task('css', () => {
        return gulp.src('src/unigrid/main.scss')
                .pipe(sass({errLogToConsole: true}))
                .pipe(autoprefixer('last 4 version'))
                .pipe(gulp.dest('dist/assets/css'))
                .pipe(cssnano())
                .pipe(rename({ suffix: '.min' }))
                .pipe(header(banner, { package : package }))
                .pipe(gulp.dest('dist/assets/css'))
                .pipe(browserSync.reload({stream:true}));
    });

    gulp.task('js', () => {
      return gulp.src('src/js/scripts.js')
              .pipe(jshint('.jshintrc'))
              .pipe(jshint.reporter('default'))
              .pipe(header(banner, { package : package }))
              .pipe(gulp.dest('dist/assets/js'))
              .pipe(uglify())
              .pipe(header(banner, { package : package }))
              .pipe(rename({ suffix: '.min' }))
              .pipe(gulp.dest('dist/assets/js'))
              .pipe(browserSync.reload({stream:true, once: true}));
    });

    gulp.task('inject', () => {
      return gulp.src(['./dist/*.html'])
              .pipe(inject(gulp.src(['./dist/assets/js/**/*.min.js',
                                     './dist/assets/css/**/*.min.css'],
                                     {read: false}), {relative: true}))
              .pipe(gulp.dest('./dist'));
    });

    gulp.task('clean:dependencies', () => {
      return (del(['./app/assets/components/**','!./app/assets/components/']));
    });

    gulp.task('copy:dependencies', () => {
      var dependencies = Object.keys(package.dependencies);
      var path = Array();
      dependencies.forEach(function(dependency){
        path.push('./node_modules/'+dependency+'/dist/*.js');
        path.push('./node_modules/'+dependency+'/dist/*.css');
      });
      return gulp.src(path,  {base: './node_modules/'})
              .pipe(gulp.dest('./app/assets/components/'));
    });

    gulp.task('dependencies', gulp.series('clean:dependencies', 'copy:dependencies'));

    gulp.task('build', gulp.series('css', 'inject'));

    gulp.task('watch', function (done) {
        browserSync.init({
            server: {
                baseDir: 'dist'
            },
            notify: false});

        gulp.watch("./src/unigrid/**/*.scss", gulp.series('css'));
        gulp.watch("./dist/*.html", reload);
        done();
    });

    gulp.task('default', gulp.series('build','watch'));
