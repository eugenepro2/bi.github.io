var gulp = require('gulp'),
		pug = require('gulp-pug'),
		cssnano = require('gulp-cssnano'),
		connect = require('gulp-connect');
		sass = require('gulp-sass');
    autoprefixer = require('gulp-autoprefixer');
    csscomb = require('gulp-csscomb');
    imagemin = require('gulp-imagemin');

// Jade
gulp.task('pug', function buildHTML() {
  return gulp.src('./assets/pug/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./public'))
  .pipe(connect.reload());
});
// gulp.task('pug', function(){
// 	gulp.src('./assets/pug/*.pug')
// 		.pipe(jade({
// 			pretty: true
// 		}))
// 		.pipe(gulp.dest('./public'))
// 		.pipe(connect.reload());
// });


gulp.task('sass', function () {
  return gulp.src('./assets/**/*.sass')
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError))
    .pipe(csscomb())
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload());
});

gulp.task('image', () =>
    gulp.src('./assets/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/img'))
);

// Minify JS
gulp.task('js', function() {
  	gulp.src('assets/**/*.js')
    .pipe(gulp.dest('./public/'))
   	.pipe(connect.reload());
});

// Watch
gulp.task('watch', function (){
	gulp.watch('./assets/**/*.js', ['js'])
	gulp.watch('./assets/pug/**/*.pug', ['pug']);
  gulp.watch('./assets/img/*', function(event) {
    gulp.run('image');
  });
});

gulp.task('sass:watch', function () {
  gulp.watch('./assets/**/*.sass', ['sass']);
});

// Server
gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});

gulp.task('default', ['pug', 'sass', 'js', 'watch', 'sass:watch', 'connect', 'image'])