import gulp from 'gulp';
import shell from 'gulp-shell';
import webserver from 'gulp-webserver';

function docco(options = []) {
  return shell.task(
    `./node_modules/.bin/docco ${options.join(' ')} functional/*.js`
  );
}

gulp.task('build', docco([
  '-t', './resources/template.jst',
  '-c', './resources/main.css'
]));

gulp.task('buildDev', docco());

gulp.task('dev', ['buildDev'], () => {
  gulp.src('docs')
    .pipe(webserver({
      livereload: true,
      open: true
    }));

  gulp.watch('functional/*.js', ['buildDev']);
});
