"use strict"
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
    let done = this.async();

    runHamlbarize()


    this.files.forEach( (f) => {
      let promises = f.src.filter( (filepath) => {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map( (filename) => {
        var promise = hamlbarize(filename)
        debugger
        promise.then( (handlebarOutput) => {
          grunt.log.writeln('File ' + f.dest.cyan + ' created.')
          grunt.log.write(handlebarOutput)
        })
        return promise
      })

      Promise.all(promises).then( () => {
        done()
      })

      // grunt.log.writeln('File ' + f.dest.cyan + ' created.');
    });
  });

  var wrapPath = function(path) {
    return '"' + path + '"';
  };

  var hamlbarize = (filename) => {
    let promise = new Promise( (resolve, reject) => {
      let socket = require("net").Socket(),
          outputFile = "";

      socket.setEncoding("utf8")

      socket.on('connection', () => {
        filePath = path.resolve(filename)
        socket.write(filePath)
      })

      socket.on('data', (data) => {
        outputFile = data
      })

      socket.on("close", () => {
        resolve(outputFile)
      })

      grunt.log.writeln("trying to connect from node")
      while( !socket.readable ){
        try{
          socket.connect(4568)
        } catch(e) {

        }

      }
    })

    return promise

  }

  let runHamlbarize = () => {
    let bin = path.join(path.dirname(__dirname), 'bin', 'hamlbars.rb'),
        spawnSync = require('child_process').spawnSync,
        spawn = require('child_process').spawn;
    grunt.log.write("running " + bin );
    let child = spawn('bundle' , ['exec', bin], { stdio: 'inherit', detached: true});
    child.unref()
  }

};
