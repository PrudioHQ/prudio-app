var gulp = require('gulp');
var chug = require('gulp-chug');
var rename = require('gulp-rename');
var loopbackAngular = require('gulp-loopback-sdk-angular');

gulp.task('lb-services', function () {
    return gulp.src('./server/app.js')
	    .pipe(loopbackAngular())
	    .pipe(rename('lb-services.js'))
	    .pipe(gulp.dest('./dashboard/dist/js'));
});

gulp.task('run-external', function () {
    return gulp.src('./dashboard/gulpfile.js')
        .pipe(chug());
});

gulp.task('default', ['lb-services', 'run-external']);