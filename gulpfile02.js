const gulp = require("gulp");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const minifycss = require("gulp-minify-css");
const connect = require("gulp-connect");
const imagemin = require("gulp-imagemin");
// gulp.task("copy-html",async ()=>{
// 	gulp.src("*.html").pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin"));
// });

gulp.task("watchall",async ()=>{

	gulp.watch("*.html",async ()=>{
		gulp.src("*.html")
		.pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin"));
	});

	gulp.watch("js/*.js",async ()=>{
        gulp.src("js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"));
    })

	// gulp.watch(["js/index.js","js/tools.js"],async ()=>{
	// 	gulp.src(["js/index.js","js/tools.js"])
	// 	.pipe(concat("common.js"))
	// 	.pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"));
	// })

	// gulp.watch(["js/index.js","js/tools.js"],async ()=>{
 //        gulp.src(["js/index.js","js/tools.js"])
 //        .pipe(concat("common.js"))
 //        .pipe(uglify())
 //        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"));
 //    })

 	gulp.watch(["js/index.js","js/tools.js"],async ()=>{
        gulp.src(["js/index.js","js/tools.js"])
        .pipe(concat("common.js"))
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"))
        .pipe(uglify())
        .pipe(rename("common.min.js"))
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\js"));
    })

    gulp.watch("css/index.css",async ()=>{
        gulp.src("css/index.css")
        .pipe(minifycss())
        .pipe(gulp.dest("E:\\phpStudy\\WWW\\benqin\\css"));
    });
});

