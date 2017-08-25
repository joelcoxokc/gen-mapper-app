import gulp from 'gulp';
import sass from 'gulp-sass';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import {build} from 'aurelia-cli';

export default function processCSS() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sass())
    // .pipe(changedInPlace({firstPass: true}))
    .pipe(build.bundle());
}
