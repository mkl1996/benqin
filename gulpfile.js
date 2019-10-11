const gulp = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const minifycss = require("gulp-minify-css");
const connect = require("gulp-connect");
const babel = require("gulp-babel");
const es2015Preset = require("babel-preset-es2015");
const sass = require("gulp-sass");

gulp.task("watchall",async ()=>{
    gulp.watch("*.html",async ()=>{
        gulp.src("*.html")
        .pipe(gulp.dest("F:\\dist"));
    });

    // gulp.watch("js/**/*",async ()=>{
    //     gulp.src("js/**/*")
    //     .pipe(gulp.dest("F:\\dist\\js"))
    // })

    gulp.watch("css/**/*",async ()=>{
        gulp.src("css/**/*")
        .pipe(gulp.dest("F:\\dist\\css"))
    })

    gulp.watch("images/**/*",async ()=>{
        gulp.src("images/**/*")
        .pipe(gulp.dest("F:\\dist\\images"))
    })

    gulp.watch("sass/**/*",async ()=>{
        gulp.src("sass/**/*")
        .pipe(gulp.dest("F:\\dist\\sass"))
    })

    gulp.watch("js/*.js",async ()=>{
        gulp.src("js/*.js")
        .pipe(babel({presets:[es2015Preset]}))
        .pipe(uglify())
        .pipe(gulp.dest("F:\\dist\\js"));
    })

})



gulp.task("server",async ()=>{
    connect.server({
        root:"F:\\dist"
    })
});