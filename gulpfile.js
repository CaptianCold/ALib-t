var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('copy-and-inline-resource', copyHtml);

function copyHtml() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist/src')).on('end', copyAssets);
}

function copyAssets () {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/src/assets')).on('end', copyCssAssets);
}

// Copy any css assets (which require no compilation) directly to dist/bundles/styles folder
function copyCssAssets () {
  gulp.src('./src/assets/css/*.css')
    .pipe(gulp.dest('./dist/bundles/styles')).on('end', compileScss);
}

function compileScss () {
  gulp.src('./dist/src/assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/bundles/styles'))
    .on('end', copyScss);
}

function copyScss() {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename(function (path) {
      path.extname = '.scss'
    }))
    .pipe(gulp.dest('./dist/src'))
    .on('end', inlineTemplates);
}

function inlineTemplates() {
  gulp.src('./dist/src/**/*.js')
    .pipe(inlineNg2Template({ base: 'dist/src',  useRelativePaths: true, target : 'es5'  }))
    .pipe(gulp.dest('./dist/src'))
    .on('end', copyPublishFiles);
}

function copyPublishFiles() {
   copyPackageJson('./package.publish.json');
   copyNpmrc('./.npmrc-publish');
   copyReadMe('./README.md');
}

function copyPackageJson(fileLoc) {
  gulp.src(fileLoc)
    .pipe(rename(function (path) {
      path.basename = 'package'
     }))
    .pipe(gulp.dest('./dist'));
}

function copyNpmrc(fileLoc) {
  gulp.src(fileLoc)
    .pipe(rename(function (path) {
      path.basename = '.npmrc'
    }))
    .pipe(gulp.dest('./dist'));
}

function copyReadMe(readMeLoc) {
  gulp.src(readMeLoc)
    .pipe(gulp.dest('./dist'));
}

gulp.task('default', ['copy-and-inline-resource']);
