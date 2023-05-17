const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

function compileSaas() {
 return gulp.src("./sass/**/*.scss") // srcのパスを記載する
 // コンパイルの処理を記載する
 .pipe(sass())
 .pipe(postcss([autoprefixer(), cssSorter()]))
 .pipe(mmq())
 .pipe(gulp.dest("./css"))
}

function watch() {
  gulp.watch("./sass/**/*.scss", compileSass)
}

exports.default = watch