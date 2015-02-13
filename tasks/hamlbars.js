/*
 * grunt-hamlbars
 * https://github.com/hrysd/grunt-hamlbars
 *
 * Copyright (c) 2013 Hiroshi Yoshida
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var path = require('path');

  grunt.registerMultiTask('hamlbars', 'Compile hamlbars to handlebars.', function() {
    this.files.forEach(function(f) {
      var src = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filename) {
        return hamlbarize(filename);
      }).join(grunt.util.normalizelf("\n"));

      grunt.file.write(f.dest, src);
      grunt.log.writeln('File ' + f.dest.cyan + ' created.');
    });
  });

  var wrapPath = function(path) {
    return '"' + path + '"';
  };

  var hamlbarize = function(filename) {
    var execSync = require('child_process').execSync,
        target   = path.resolve(filename),
        bin      = path.join(path.dirname(__dirname), 'bin', 'hamlbars'),
        result   = execSync('bundle exec ' + wrapPath(bin) + ' ' + wrapPath(target));

    return result;
  };
};
