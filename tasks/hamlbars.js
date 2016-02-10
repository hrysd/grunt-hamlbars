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

  let path = require('path'),
      globalHamlbarizeTimeout = 1500,
      sep = "$hamlbarsfileend$"

  grunt.registerMultiTask('hamlbars', 'Compile hamlbars to handlebars.', function() {
    let done = this.async(),
        hamlbarizeProcess = runHamlbarize(),
        promises = []


    this.files.forEach( (f) => {
      f.src.filter( (filepath) => {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map( (fileName) => {

        let fileContent = grunt.file.read( path.resolve(fileName) )

        let promise = hamlbarize(fileContent)

        promise.then( (handlebarOutput) => {
          grunt.file.write(f.dest, handlebarOutput);
          grunt.log.writeln('File ' + f.dest.cyan + ' created.')
        }).catch( (e) => {
          grunt.log.writeln("Error: " + e)
        } )
        promises.push(promise)
      })
    });

    Promise.all(promises).then( () => {
      done()
      hamlbarizeProcess.kill()
    })

  });


  let hamlbarize = (fileContent) => {

    let promise = new Promise( (resolve, reject) => {

      let socket = require("net").Socket({readable: true, writable: true}),
          outputFile = "";

      socket.setKeepAlive(true)
      socket.setNoDelay(true)
      socket.setEncoding("utf8")
      socket.setTimeout(6000, () => {
        reject('timeout')
      })

      socket.on('connect', () => {
        socket.write(fileContent + sep)
      })

      socket.on('data', (data) => {
        outputFile = data
      })

      socket.on('error', (error) => {
        grunt.log.writeln(error)
        reject(error)
      })

      socket.on("close", (data, something) => {
        resolve(outputFile)
      })

      setTimeout( () => { socket.connect(4568)}, globalHamlbarizeTimeout)
      globalHamlbarizeTimeout += 20

    })

    return promise
  }

  let runHamlbarize = () => {
    let bin = path.join(path.dirname(__dirname), 'bin', 'hamlbars.rb'),
        spawnSync = require('child_process').spawnSync,
        spawn = require('child_process').spawn;

    let child = spawn('bundle' , ['exec', bin], {stdio: 'inherit'});

    return child
  }

};
