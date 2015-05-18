// Generated on 2014-04-30 using generator-angular 0.8.0
'use strict';
// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt); // Load grunt tasks automatically.
  require('time-grunt')(grunt); // Time how long tasks take. Can help when optimizing build times.

  grunt.initConfig({ // Define the configuration for all the tasks.
    yeoman: { // Project settings.
      // configurable paths.
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },
    watch: {  // Watches files for changes and runs tasks based on the changed files.
      options: {
        livereload: true
      },
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/**/*.js'],
        tasks: ['newer:jshint:all']
      },
      jsTest: {
        files: ['test/spec/**/*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      compass: {
        files: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          // livereload: '<%= connect.options.livereload %>'
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ],
          middleware: function (connect, options) {
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }

            // Setup the proxy
            var middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest];

            // Serve static files.
            options.base.forEach(function(base) {
              middlewares.push(connect.static(base));
            });

            // Make directory browse-able.
            var directory = options.directory || options.base[options.base.length - 1];
            middlewares.push(connect.directory(directory));

            return middlewares;
          }
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.app %>/videos/**/*.{mp4,webm,ogg,mpg,mov,avi,flv}',
          '<%= yeoman.app %>/data/**/*.{json,csv,tsv,xml,txt}'
        ]
      }
    },
    connect: {  // The actual grunt server settings.
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            '.tmp',
            'test',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%= yeoman.dist %>'
        }
      }
    },
    jshint: { // Make sure code styles are up to par and there are no obvious mistakes.
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/scripts/**/*.js'
      ],
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/**/*.js']
      }
    },
    clean: { // Empties folders to start fresh.
      options: {
        force: true
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    autoprefixer: { // Add vendor prefixed styles.
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '.tmp/styles/'
        }]
      }
    },
    bowerInstall: { // Automatically inject Bower components into the app.
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: '<%= yeoman.app %>/'
      },
      sass: {
        src: ['<%= yeoman.app %>/styles/**/*.{scss,sass}'],
        ignorePath: '<%= yeoman.app %>/bower_components/'
      }
    },
    compass: {  // Compiles Sass to CSS and generates necessary files if requested.
      options: {
        sassDir: '<%= yeoman.app %>/styles',
        cssDir: '.tmp/styles',
        generatedImagesDir: '.tmp/images/generated',
        // generatedImagesPath: '.tmp/images/generated', // testing path - no effect.
        imagesDir: '<%= yeoman.app %>/images',
        // imagesPath: '/images',  // testing path - no effect.
        javascriptsDir: '<%= yeoman.app %>/scripts',
        fontsDir: '<%= yeoman.app %>/styles/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/images',
        httpGeneratedImagesPath: '/images/generated',
        httpFontsPath: '/styles/fonts',
        relativeAssets: true, // false
        assetCacheBuster: false,
        raw: 'Sass::Script::Number.precision = 10\n'
      },
      bootstrap: {  // Adding in sass-bootstrap-official.
        sassDir: '<%= yeoman.app %>/bower_components/bootstrap-sass-official',
        cssDir: '.tmp/styles'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/images/generated',
          generatedImagesPath: '<%= yeoman.dist %>/images/'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },
    rev: {  // Renames files for browser caching purposes.
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/**/*.js',
            '<%= yeoman.dist %>/styles/**/*.css',
            '<%= yeoman.dist %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}', // This line can cause issues in minification output due to bug in usemin. Safe to comment out if needed.
            '<%= yeoman.dist %>/videos/**/*.{mp4,webm,ogg,avi,mpg,mov}' // This line can cause issues in minification output due to bug in usemin. Safe to comment out if needed.
            // '<%= yeoman.dist %>/styles/fonts/*'
          ]
        }
      }
    },
    useminPrepare: { // Reads HTML for usemin blocks to enable smart builds that automatically concat, minify and revision files. Creates configurations in memory so additional tasks can operate on them.
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },
    usemin: { // Performs rewrites based on rev and the useminPrepare configuration.
      //options: {
      //  assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images/*', '<%= yeoman.dist %>/videos/*', '<%= yeoman.dist %>/data/*'],
      //},
      //html: ['{,*/}*.html'], // Default:  ['{,*/}*.html'], Custom: ['<%= yeoman.dist %>/**/*.html'],
      //css: ['{,*/}*.css'] // Default:  ['{,*/}*.css'], Custom: ['<%= yeoman.dist %>/styles/**/*.css']

      options: {
        assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images', '<%= yeoman.dist %>/videos'],
        patterns: {
          html: [
            [/(videos\/.*?\.(?:mp4|ogg|webm))/gm, 'Update HTML to reference revved videos'],
            [/(images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update HTML to reference revved images'],
            [/(styles\/.*?\.(?:css))/gm, 'Update HTML to reference revved css'],
            [/(scripts\/.*?\.(?:js))/gm, 'Update HTML to reference revved js']
          ]
        }
      },
      html: ['<%= yeoman.dist %>/*.html'],  // Default:  ['{,*/}*.html'], Custom: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/styles/*.css'], // Default:  ['{,*/}*.css'], Custom: ['<%= yeoman.dist %>/styles/**/*.css']
      videos: ['<%= yeoman.dist %>/videos/720p/*.{mp4,webm,ogg,avi,mpg,mov}'] // Custom.
    },
    cssmin: { // The following *-min tasks produce minified files in the dist folder.
      options: {
        //root: '<%= yeoman.app %>'  // comment this out if css pathing issues occur.
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '**/*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/**/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },
    ngmin: { // ngmin tries to make the code safe for minification automatically by using the Angular long form for dependency injection. It doesn't work on things like resolve or inject so those have to be done manually.
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },
    cdnify: { // Replace Google CDN references
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },
    copy: { // Copies remaining files to places other tasks can use
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/**/*.html',
            'images/**/*.{png,jpg,gif,webp,svg}',
            'videos/**/*.{mp4,webm,ogg,mpg,mov,avi,flv}',
            'scripts/**/*.js',
            'data/**/*.{json,csv,tsv,xml,txt}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/*',
          dest: '<%= yeoman.dist %>/*',
          src: ['generated/*']
        }]
      },
      // Added the entire images key.
      images: {
        expand: true,
        cwd: '<%= yeoman.app %>/images',
        dest: '<%= yeoman.dist %>/images',
        src:  ['generated/*']
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '**/*.css'
      },
      data: {
        expand: true,
        cwd: '<%= yeoman.app %>/data',
        dest: '<%= yeoman.dist %>/data/**/*',
        src: '/data/**/*'
      },
      videos: {
        expand: true,
        cwd: '<%= yeoman.app %>/videos',
        dest: '<%= yeoman.dist %>/videos',
        src: '/videos/*'
      }
    },
    concurrent: { // Run some tasks in parallel to speed up the build process
      server: [
        'compass:server'
      ],
      test: [
        'compass'
      ],
      dist: [
        'compass:dist',
        'imagemin',
        'svgmin'
      ]
    },
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= yeoman.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //  // options:{mangle:false},
    //   dist: {
    //     files: {
    //       '<%= yeoman.dist %>/scripts/scripts.js': [
    //         '<%= yeoman.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },
    karma: { // Test settings
      e2e: {
        configFile: 'karma-e2e.conf.js',
        singleRun: true
      },
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'bowerInstall',
      'concurrent:server',
      'compass:bootstrap', // Tetsing sass-bootstrap-official.
      'autoprefixer',
      'configureProxies', // Added for remote testing.
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test:e2e', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:livereload',
    'karma:e2e'
  ]);

  grunt.registerTask('test:unit', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma:unit'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'bowerInstall',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'copy:data',
    'copy:videos',
    'cdnify',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
};
