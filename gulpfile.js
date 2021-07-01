// Get dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCss = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var postcss = require('gulp-postcss');
var sourcermaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
const babel = require('gulp-babel');
const { series, parallel } = require('gulp');


// Dev Tools
// -----------------
//Watch for changes in app/scss folder and convert to css, also watch for
// changes to html or JavaScript in the app folder and reload with browserSync

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(gulp.dest('app/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

// Watchers
gulp.task('watch', function(done) {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
    gulp.watch('app/*.html', function(done) {
      browserSync.reload();
      done();
    });
    gulp.watch('app/js/**/*.js', function(done) {
      browserSync.reload();
      done();
    });
    done();
})

// Production Tools
// ------------------

// Optimizing CSS and JavaScript
gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', babel()))
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('autoprefixer', function() {
  return gulp.src('app/css/*.css')
    .pipe(sourcermaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcermaps.write('.'))
    .pipe(gulp.dest('dist/css'))
});
// Optimizing Images
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    // Cach images so you don't repeat unnessassary
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Cleaning up
gulp.task('clean:dist', function(cb) {
   del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
   cache.clearAll();
   cb();
});

// Build Sequences
// ---------------

//gulp.task('default', series( parallel('sass', 'browserSync')), 'watch');
gulp.task('default', parallel('watch', series('sass','browserSync')));


gulp.task('build', series(
  'clean:dist',
  'sass',
  'autoprefixer',
  parallel('useref','images','fonts')
));
