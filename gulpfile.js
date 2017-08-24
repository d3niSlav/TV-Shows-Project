var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('sass', function () {
    return gulp.src('./public/sass/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('public/css'));
});

gulp.task('javascript', function () {
    return gulp.src([
        './public/js/app.js',
        './public/js/app-routes.js',
        './public/js/services/main.service.js',
        './public/js/services/all-shows.service.js',
        './public/js/services/users.service.js',
        './public/js/services/profiles.service.js',
        './public/js/services/comments.service.js',
        './public/js/services/contact-us.service.js',
        './public/js/services/single-show.service.js',
        './public/js/controllers/*.js',
        './public/js/directives/*.js'
    ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/javascripts/'));
});

gulp.task('watch', function () {
    gulp.watch('./public/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['javascript', 'sass']);