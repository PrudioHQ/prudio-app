var gulp = require('gulp'),
    usemin = require('gulp-usemin'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    minifyCss = require('gulp-minify-css'),
    minifyJs = require('gulp-uglify'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifyHTML = require('gulp-minify-html'),
    loopbackAngular = require('gulp-loopback-sdk-angular'),
    protractor = require("gulp-protractor").protractor,
    webdriver_update = require('gulp-protractor').webdriver_update;
    instance = undefined;

var paths = {
    scripts: 'dashboard/src/js/**/*.*',
    styles: 'dashboard/src/less/**/*.*',
    images: 'dashboard/src/img/**/*.*',
    templates: 'dashboard/src/templates/**/*.html',
    index: 'dashboard/src/index.html',
    bowerFonts: 'dashboard/src/components/**/*.{ttf,woff,eof,svg}',
};

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp.src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('build/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bowerFonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('build/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('build/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(minifyCss({keepSpecialComments: 0}))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('build/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

gulp.task('livereload', function() {
    gulp.src(['build/**/*.*'])
        .pipe(watch())
        .pipe(connect.reload());
});

/**
 * Gulp publish lbServices
 */

gulp.task('lb-services', function () {
    return gulp.src('./server/server.js')
        .pipe(loopbackAngular())
        .pipe(rename('lb-services.js'))
        .pipe(gulp.dest('dashboard/src/js/services'));
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'livereload', 'watch']);

/**
* Protractor Tests
*/
gulp.task('webdriver_update', webdriver_update);

gulp.task('start-local-server', function(){
    var app = require('./server/server')
    instance = app.start();
});

gulp.task('protractor', ['webdriver_update', 'start-local-server'], function(cb) {
    gulp.src(["test/e2e/*.js"])
        .pipe(protractor({
            configFile: "test/protractor.config.js"
        }))
        .on('error', function(e) { throw e })
        .on('end', function(){
            if (instance){
                instance.close();
            }
        });
});
