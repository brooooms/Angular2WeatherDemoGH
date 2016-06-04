/* global require, module */
const Angular2App = require('angular-cli/lib/broccoli/angular2-app');
const compileSass = require('broccoli-sass');
const mergeTrees = require('broccoli-merge-trees');
const _ = require('lodash');
const glob = require('glob');
const compileCSS = require('broccoli-postcss');
const cssnext = require('postcss-cssnext');
const cssnano = require('cssnano');

const options =  {
  plugins: [
    {
      module: cssnext,
      options: {
        browsers: ['> 1%'],
        warnForDuplicates: false
      }
    },
    {
      module: cssnano,
      options: {
        safe: true,
        sourcemap: true
      }
    }
  ]
};

module.exports = function(defaults) {
  let appTree = new Angular2App(defaults, {
    sassCompiler: {
      includePaths: [
        'src/style'
      ]
    },
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)'
    ]
  });

  let sass = mergeTrees(_.map(glob.sync('src/**/*.sass'), function(sassFile) {
    sassFile = sassFile.replace('src/', '');
    return compileSass(['src'], sassFile, sassFile.replace(/.sass$/, '.css'));
  }));

  let css = compileCSS(sass, options);

  return mergeTrees([appTree, sass, css], { overwrite: true });
};
