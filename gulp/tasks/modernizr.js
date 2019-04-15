// Modernizr has the ability to browsers for hundreds of things.  However, the more you test for, the larger the JS package becomes.  So we can specify what we want to test.

let gulp = require('gulp'),
    modernizr = require('gulp-modernizr');

gulp.task("modernizr", function() {
    return gulp.src(["./app/assets/styles/**/*.css", "./app/assets/scripts/**/*.js"])
        .pipe(modernizr({
            "options": [
                "setClasses"
            ]
        }))
        .pipe(gulp.dest("./app/temp/scripts/"));
});