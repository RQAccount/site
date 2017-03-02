require('shelljs/global')

var gulp = require('gulp')
var gp_deploy = require('gulp-gh-pages')
var open = require("gulp-open")
var rename = require("gulp-rename")

var options = {}

gulp.task('deploy', function () {
  return gulp.src('./_docs/**/*')
    .pipe(gp_deploy(options))
})

gulp.task('generate', function () {
	// Run external tool synchronously
	if (exec('ydoc build').code !== 0) {
	  echo('Error: generate.sh exec failed')
	  exit(1)
	}	
})

gulp.task('show', ['generate', 'watch'], function () {
  if (exec('browser-sync start --server _docs --open --no-notify').code !== 0) {
	  echo('Error: generate.sh exec failed')
	  exit(1)
	}
  
  console.log('show')
})

gulp.task('watch', function () {
    gulp.watch('*.md', ['generate']);
});

gulp.task('default', ['generate', 'deploy'] , function () {
  console.log('default')
})
