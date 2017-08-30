const roboter = require('roboter');

roboter.
  workOn('server').
  equipWith(task => {
    task('universal/analyze', {
      src: [
        '**/*.js',
        '**/*.jsx',
        '!node_modules/**/*.js',
        '!build/**/*.js'
      ],
      rules: '.eslintrc.json'
    });

    task('universal/shell', {
      build: [ 'NODE_ENV=production ./node_modules/.bin/webpack' ],
      serve: [ './node_modules/.bin/webpack-dev-server' ]
    });
  }).
  start();
