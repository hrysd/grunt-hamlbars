# grunt-hamlbars

> Compile hamlbars to handlebars.

## Requirements

Before using this module, you should prepare `Gemfile` like below.

```ruby
source 'https://rubygems.org'

gem 'hamlbars'
```

then run `bundle install`

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hamlbars --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hamlbars');
```

## The "hamlbars" task

### Overview
In your project's Gruntfile, add a section named `hamlbars` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  hamlbars: {
    default: {
      files: [
        expand: true, cwd: 'src/', src: '**/*.hamlbars', dest: 'tmp/build/', ext: '.handlebars'
      ]
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
