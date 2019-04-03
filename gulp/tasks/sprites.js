let gulp = require("gulp"),
    svgSprite = require("gulp-svg-sprite"),
    rename = require("gulp-rename"),
    del = require("del");

let config = {
    mode: {
        css: {
            sprite: "sprite.svg",
            render: {
                css: {
                    template: "./gulp/templates/sprite.css"
                }
            }
        }
    }
}

/* beginClean removes the sprite and sprites folder each time you run the gulp icons task.  The reason being, if you add or remove icons from your icon folder and run gulp icons, it'll just create duplicate files.  This removes the folders each time you run the task so that the copySpriteGraphic and createSprite tasks are running as if it's their first time everytime they're ran. */

gulp.task("beginClean", function() {
    return del(["./app/temp/sprite", "./app/assets/images/sprites"]);
});

gulp.task("createSprite", ["beginClean"], function() {
    return gulp.src("./app/assets/images/icons/**/*.svg")
        .pipe(svgSprite(config))
        .pipe(gulp.dest("./app/temp/sprite/"));
});

gulp.task("copySpriteGraphic", ["createSprite"], function() {
    return gulp.src("./app/temp/sprite/css/**/*.svg")
        .pipe(gulp.dest("./app/assets/images/sprites"));
});

/* copySpriteCSS takes the file created in copySpriteGraphic, turns it into a CSS file and creates a file name that follows our naming convention.  It then saves the file into our existing modules folder to keep organized.  */

gulp.task("copySpriteCSS", ["createSprite"], function() {
    return gulp.src("./app/temp/sprite/css/*.css")
        .pipe(rename("_sprite.css"))
        .pipe(gulp.dest("./app/assets/styles/modules"));
});

/* endClean deletes the temp folder after running the gulp icons task because it's no longer needed */

gulp.task("endClean", ["copySpriteGraphic", "copySpriteCSS"], function (){
    return del(["./app/temp/sprite"]);
}); 

gulp.task("icons", ["beginClean", "createSprite", "copySpriteGraphic", "copySpriteCSS", "endClean"]);