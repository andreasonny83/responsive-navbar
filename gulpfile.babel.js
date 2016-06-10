/**
 * Copyright (c) 2016 by andreasonny83. All Rights Reserved.
 *
 * This code may only be used under the MIT style license found at
 *
 *   https://andreasonny.mit-license.org/@2016/
 *
 */
import gulp from 'gulp';
import browserSync from 'browser-sync';
const reload = browserSync.reload;

// Watch files for changes & reload
gulp.task('serve', () => {
  browserSync({
    notify: false,
    logPrefix: 'ResponsiveNav',
    server: ['.', 'demo'],
    port: 3000
  });

  gulp.watch(['./**/*.*']).on('change', reload);
});
