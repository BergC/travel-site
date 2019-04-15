/*
Build is used for
*/

let gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    usemin = require('gulp-usemin'),
    rev = require('gulp-rev'),
    cssnano = require('gulp-cssnano'), // Used to compress CSS.
    uglify = require('gulp-uglify'), // Used to compress HTML.
    browserSync = require('browser-sync').create();

gulp.task("previewDist", function() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: "docs"
        }
    });
});

gulp.task('deleteDistFolder', ["icons"], function() {
    return del("./docs"); // This deletes the dist folder each build so that if we make changes to file names we have a clean build that reflects those changes each time.
});

  gulp.task("copyGeneralFiles", ["deleteDistFolder"], function() {
          let pathsToCopy = [
              './app/**/*',
              '!./app/index.html',
              '!./app/assets/images/**',
              '!./app/assets/styles/**',
              "!./app/assets/scripts/**",
              "!./app/temp",
              "!./app/temp/**"
          ]

          return gulp.src(pathsToCopy)
          .pipe(gulp.dest("./docs"));
  });

gulp.task('optimizeImages', ["deleteDistFolder"], function() {
    return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*']) // Exclamation mark lets us exclude files.
        .pipe(imagemin({
            progressive: true, // Helps optimize images.
            interlaced: true, // Helps with GIF images we may have.
            multipass: true // This helps with SVG files.
        }))
        .pipe(gulp.dest("./docs/assets/images"));
});

gulp.task("useminTrigger", ["deleteDistFolder"], function() {
    gulp.start("usemin");
});

// This copies over our files to our dist folder.

gulp.task("usemin", ["styles", "scripts"], function() {
    return gulp.src("./app/index.html")
        .pipe(usemin({
            css: [function() {return rev()}, function() {return cssnano()}],
            js: [function() {return rev()}, function() {return uglify()}]
        }))
        .pipe(gulp.dest("./docs"));
})

gulp.task('build', ["deleteDistFolder", "copyGeneralFiles", "optimizeImages", "useminTrigger"]); 