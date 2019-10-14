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
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin"));
    });

    gulp.watch("js/**/*",async ()=>{
        gulp.src("js/**/*")
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"))
    })

    gulp.watch("images/**/*",async ()=>{
        gulp.src("images/**/*")
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\images"))
    })

    gulp.watch("sass/**/*",async ()=>{
        gulp.src("sass/**/*")
        .pipe(sass())
        .pipe(gulp.dest("F:\\benqin\\css"))
    })

    gulp.watch("sass/**/*",async ()=>{
        gulp.src("sass/**/*")
        .pipe(sass())
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\css"))
    })


})


gulp.task("server",async ()=>{
    connect.server({
        root:"F:\\benqin"
    })
});