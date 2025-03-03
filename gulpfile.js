const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");
const browserSync = require("browser-sync");
const cleanCss = require("gulp-clean-css"); //cssの圧縮
const plumber = require('gulp-plumber');// エラーが起こってもタスクが停止しないようにするプラグイン
const concat = require('gulp-concat');// concat
const uglify = require("gulp-uglify"); //jsの圧縮
const rename = require("gulp-rename");
const htmlBeautify = require("gulp-html-beautify"); //htmlの整形

//sassのコンパイル
function compileSass() {
  return gulp.src("./common/css/**/*.scss")
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssSorter()]))
  .pipe(mmq())
  .pipe(gulp.dest("./common/css/"))
  .pipe(cleanCss())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("./common/css/"));
}

function watch() {
  gulp.watch("./common/css/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./common/js/**/*.js", browserReload);
  gulp.watch("./common/img/**/*", gulp.series(copyImage, browserReload));
  gulp.watch("./**/*.php", browserReload);
  gulp.watch("../**/*.html", browserReload);
}

function browserInit(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

//HTMLの整形
// function formatPHP(done) {
//   gulp.src("./**/*.php")
//     .pipe(htmlBeautify({
//       indent_size: 2,
//       indent_with_tabs: true,
//     }))
//     .pipe(gulp.dest("./"));
//   done();
// }

// concat
function concatJS() {
  return gulp.src([
    './common/js/common/swiper.js',
    './common/js/common/accordion.js',
    './common/js/common/script.js'
  ])
  // .pipe(plumber())
  .pipe(concat('common.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest('./common/js'));
};

function concatPlugin() {
  return gulp.src([
    './common/js/plugin/jquery.min.js',
    './common/js/plugin/swiper.min.js',
    './common/js/plugin/desvg.js',
    './common/js/plugin/tippy-core.min.js',
    './common/js/plugin/tippy-bundle.umd.min.js',
    './common/js/plugin/wow.min.js'
  ])
  .pipe(concat('plugins.js'))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest('./common/js'));
};

//jsコンパイル
function minJS() {
  return gulp.src("./common/js/concat.js")
  .pipe(gulp.dest("./common/js"))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("./common/js"))
}

function copyImage(done) {
  gulp.src("./common/img/**/*")
    .pipe(gulp.dest("./common/img/"));
  done();
}

exports.dev = gulp.parallel(compileSass, browserInit, watch);
exports.minJS = minJS;
exports.build = gulp.parallel(minJS, compileSass, copyImage);
exports.default = gulp.parallel(compileSass, browserInit, concatJS, concatPlugin, watch);