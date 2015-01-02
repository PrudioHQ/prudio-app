var gulp = require( 'gulp' );
var chug = require( 'gulp-chug' );

gulp.task( 'default', function () {
    gulp.src( './dashboard/gulpfile.js' )
        .pipe( chug() )
} );