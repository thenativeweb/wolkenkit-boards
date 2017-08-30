'use strict';

const roboter = require('roboter');

roboter.
  workOn('server').
  equipWith(task => {
    task('universal/analyze', {
      src: [ '**/*.js', '!node_modules/**/*.js', '!coverage/**/*.js', '!client/**/*.js' ]
    });

    task('universal/license', {
      compatible: [
        // Individual licenses
        'Apache-2.0', 'Apache-2.0*',
        'BSD-2-Clause', 'BSD-3-Clause',
        'ISC',
        'LGPL-3.0',
        'MIT', 'MIT/X11', 'MIT*',
        'MIT Licensed. http://www.opensource.org/licenses/mit-license.php',
        'Public Domain', 'Unlicense',

        // Combined licenses
        '(Apache-2.0 OR MPL-1.1)',
        'BSD-3-Clause OR MIT',
        '(MIT AND CC-BY-3.0)',
        '(WTFPL OR MIT)'
      ],

      ignore: {
        // MIT, see https://github.com/squaremo/bitsyntax-js/commit/1692d9ec2b1bb703c44f10b181d383fa51a21f5d
        bitsyntax: '0.0.4',

        // BSD-3-Clause, see https://github.com/deoxxa/duplexer2/blob/0.0.2/LICENSE.md
        duplexer2: '0.0.2',

        // BSD-3-Clause, see https://github.com/estools/esquery/blob/v1.0.0/license.txt
        esquery: '1.0.0',

        // MIT, see https://github.com/mklabs/node-fileset/blob/v0.2.1/LICENSE-MIT
        fileset: '0.2.1',

        // MIT, see https://github.com/tarruda/has/blob/1.0.1/package.json
        has: '1.0.1',

        // BSD-3-Clause, see https://github.com/kriszyp/json-schema/blob/81ca359daeea643019a4ee81b7a57c06ac53d800/README.md
        'json-schema': '0.2.3',

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
