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
      'analyze-styles': './node_modules/.bin/stylelint "src/**/*.css"',
      build: 'NODE_ENV=production ./node_modules/.bin/webpack',
      serve: './node_modules/.bin/webpack-dev-server'
    });

    task('universal/license', {
      compatible: [
        // Individual licenses
        'Apache-2.0', 'Apache-2.0*', 'APACHEv2',
        'BSD-2-Clause', 'BSD-3-Clause',
        'CC0-1.0',
        'CC-BY-4.0',
        'ISC',
        'LGPL-2.1+', 'LGPL-3.0',
        'MIT', 'MIT*', 'MIT/X11',
        'MIT Licensed. http://www.opensource.org/licenses/mit-license.php',
        'MIT (http://mootools.net/license.txt)',
        'Public Domain',
        'Unlicense',

        // Combined licenses
        '(Apache-2.0 OR MPL-1.1)',
        'BSD-3-Clause OR MIT',
        '(GPL-2.0 OR MIT)',
        '(MIT AND CC-BY-3.0)',
        'MPL-2.0 OR Apache-2.0',
        '(WTFPL OR MIT)'
      ],

      ignore: {
        // MIT, see https://github.com/veged/coa/blob/v1.0.4/package.json
        coa: '1.0.4',

        // BSD-2-Clause, see https://github.com/fb55/css-select/blob/v1.2.0/LICENSE
        'css-select': '1.2.0',

        // BSD-2-Clause, see https://github.com/fb55/css-what/blob/v2.1.0/LICENSE
        'css-what': '2.1.0',

        // BSD-3-Clause, see https://github.com/deoxxa/duplexer2/blob/0.0.2/LICENSE.md
        duplexer2: '0.0.2',

        // BSD-2-Clause, see https://github.com/fb55/entities/blob/v1.1.1/LICENSE
        entities: '1.1.1',

        // BSD-3-Clause, see https://github.com/estools/esquery/blob/v1.0.0/license.txt
        esquery: '1.0.0',

        // MIT, see https://github.com/mklabs/node-fileset/blob/v0.2.1/LICENSE-MIT
        fileset: '0.2.1',

        // MIT, see https://github.com/tarruda/has/blob/1.0.1/package.json
        has: '1.0.1',

        // MIT, see https://github.com/leecrossley/isNumeric/blob/cb15ad5c1d7856d83ac3bcd0129f72dd20fec69c/package.json
        isnumeric: '0.2.0',

        // BSD-3-Clause, see https://github.com/dankogai/js-base64/blob/2.1.9/LICENSE.md
        'js-base64': '2.1.9',

        // BSD-3-Clause, see https://github.com/kriszyp/json-schema/blob/81ca359daeea643019a4ee81b7a57c06ac53d800/README.md
        'json-schema': '0.2.3',

        // BSD-2-Clause, see https://github.com/fb55/nth-check/blob/8dc13bd152045eec338c283ebcff0296a9e37d26/package.json
        'nth-check': '1.0.1',

        // BSD-2-Clause, see https://github.com/facebook/regenerator/blob/30d34536b9e3f7a2873b04a16ec66fec9c8246f6/LICENSE
        'regenerator-transform': '0.10.1',

        // BSD-2-Clause, see https://github.com/jviereck/regjsparser/blob/0.1.5/LICENSE.BSD
        regjsparser: '0.1.5',

        // MIT, see https://github.com/eugeneware/unique-stream/blob/v1.0.0/LICENSE
        'unique-stream': '1.0.0'
      }
    });
  }).
  start();
