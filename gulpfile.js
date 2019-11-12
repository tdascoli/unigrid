var browserSync = require('browser-sync').create();
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minify      = require('gulp-minifier');
var inject      = require('gulp-inject');
var del         = require('del');


// Static Server + watching scss/html files
gulp.task('watch', function () {
    browserSync.init({
        server: './app'
    });

    gulp.watch('src/unigrid-scss/**/*.scss', gulp.series('sass'));
    gulp.watch('src/docs/**/*.html', gulp.series('html','inject'));
    gulp.watch(['app/**/*']).on('change', browserSync.reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
    return gulp.src('src/unigrid-scss/**/*.scss')
        .pipe(sass())
        .pipe(minify({
          minify: true,
          minifyCSS: true,
          getKeptComment: function (content, filePath) {
              var m = content.match(/\/\*![\s\S]*?\*\//img);
              return m && m.join('\n') + '\n' || '';
          }
        }))
        .pipe(gulp.dest("app/css/"))
        .pipe(browserSync.stream());
});

gulp.task('inject', () => {
  return gulp.src(['./app/*.html'])
          .pipe(inject(gulp.src(['./app/**/*.js',
                                 './app/**/*.css'],
                                 {read: false}),
                                 {relative: true}))
          .pipe(gulp.dest('./app'))
          .pipe(browserSync.stream());
});

gulp.task('html', function(){
  return gulp.src('src/docs/*.html')
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.stream());
});

gulp.task('clean', function () {
  return del('dist/**/*');
});

gulp.task('default', gulp.series('sass','inject','watch'));
