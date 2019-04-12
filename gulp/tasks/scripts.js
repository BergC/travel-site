var gulp = require('gulp'),
    webpack = require('webpack');

/*
webpack allows for two interesting callbacks in the function, "err" and "stats".  These can be used to pring any errors to the command line if they occur and similarly print some stats about the function to the console.
*/

gulp.task('scripts', function(callback) {
    webpack(require('../../webpack.config.js'), function(err, stats) {
        if (err) {
            console.log(err.toString());
        }

        console.log(stats.toString());

        callback();
    });
}); 