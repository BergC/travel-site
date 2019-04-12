let gulp = require('gulp'),
     watch = require('gulp-watch'),
     browserSync = require('browser-sync').create();

gulp.task('watch', function() {
    
    watch('./app/index.html', function() {
        browserSync.reload();
    });

    watch('./app/assets/styles/**/*.css', function() {
        gulp.start('cssInject');
    });

    watch('./app/assets/scripts/**/*.js', function() {
        gulp.start('scriptsRefresh');
    });

    browserSync.init({
        notify: false,
        server: {
            baseDir: "app"
        }
    });

});

gulp.task('cssInject', ['styles'], function() {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

/* 
This will have browserSync refresh the page everytime scriptsRefresh is started, which occurs everytime a JS file is saved in the app/assets/scripts folder.  Notice it's dependent on the main scripts task running first, allowing it to execute webpack.
*/

gulp.task('scriptsRefresh', ['scripts'], function() {
    browserSync.reload();
});