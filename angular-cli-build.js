/* global require, module */
const Angular2App = require('angular-cli/lib/broccoli/angular2-app');

// To compile SASS with node-sass.
const compileSass = require('broccoli-sass');

// To execute multiple build processes and then merge them back together
// in one single tree necessary for the module.exports.
const mergeTrees = require('broccoli-merge-trees');

// [PostCSS](http://postcss.org/)  A tool for transforming CSS with JavaScript
// the plug-in for Broccoli that integrates the PostCSS pipeline
const compileCSS = require('broccoli-postcss');

// the PostCSS plug-in that handles autoprefixing
const cssnext = require('postcss-cssnext');

// a CSS minification tool
const cssnano = require('cssnano');

const _ = require('lodash');
const glob = require('glob');

/*
 PostCSS options: which plugins to load and how to use them.
 here that tell PostCSS to use two modules: cssnext and cssnano
 */
const options =  {
  plugins: [
    {
      module: cssnext,
      options: {
        browsers: [
          'ie >= 9',
          'ie_mob >= 10',
          'ff >= 30',
          'chrome >= 40',
          'safari >= 7',
          'opera >= 23',
          'ios >= 7',
          'android >= 4.4',
          'bb >= 10'
        ],
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
  /*
   an example of a Broccoli tree: appTree, sass, css, etc
   A tree can be any string representing a directory path
   or an Objectthat conforms to the Broccoli.JS Plugin API specification
  */
  let appTree = new Angular2App(defaults, {
    /*
     sassCompiler takes the same arguments that node-sass does
     https://github.com/sass/node-sass
    */
    sassCompiler: {
      /*
        will not compile the global SASS, but it does configure the node-sass compiler
        to find files when using the @import directive. Now you can import SASS from
        `src/style` anywhere in your app to use SASS variables declared globally
        inside component level SASS.
      */
      includePaths: [
        'src/styles'
      ]
    },
    // specifies an Array of file globs that this app will load into the `/dist/vendor` directory
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'es6-shim/es6-shim.js',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      '@ngrx/**/*.+(js|js.map)',
      'ngrx-store-logger/dist/*.+(js|js.map)'
    ]
  });

  /*
   requires that global SASS resides in the `/src` folder, but as an added side effect
   it also compiles the rest of the component level SASS in the same directory.

   Transform the path slightly for the compileSass plug-in, removing the `src/`.
   compileSass takes the tree that needs to be compiled (in this case 'src'),
   the file path for the SASS file, and the file path of the destination CSS file.
   Since the files are being iterated, each file passes through this function and
   will be compiled into CSS.
   */
  let sass = mergeTrees(_.map(glob.sync('src/**/*.sass'), (sassFile) => {
    sassFile = sassFile.replace('src/', '');
    return compileSass(['src'], sassFile, sassFile.replace(/.sass$/, '.css'));
  }));

  // pass the SASS tree (which output the file paths of the .css files) and the options
  let css = compileCSS(sass, options);

  /*
   mergeTrees 1st argument is an Array, optionally 2nd argument with an Object of options.
   Set `overwrite: true` to override the default SASS compile for new custom compile

   important the trees are in this order, so they override each other correctly
   */
  return mergeTrees([appTree, sass, css], { overwrite: true });
};
