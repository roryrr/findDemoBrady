/* jslint node: true */

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      temp: {
        src: '.tmp'
      },
      dist: {
        src: 'dist'
      }
    },

    copy: {
      images: {
        files: [
          {
            expand: true,
            cwd: 'src/images/',
            src: '**',
            dest: 'dist/<%= pkg.path %>/images'
          }
        ]
      },
      index: {
        files: [
          {
            expand: true,
            src: ['*.html', 'css_burberry/*.css'],
            dest: 'dist/<%= pkg.path %>'
          }
        ]
      }
    },

    html2js: {
      templates: {
        options: {
          base: 'src',
          module: 'ebCustomTemplates',
          singleModule: false,
          htmlmin: {
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
          }
        },
        src: [
          'src/components/**/*.html',
          'src/structure/**/*.html',
          'src/commons/icons/**/*.html'
        ],
        dest: '.tmp/templates.js'
      }
    },

    concat: {
      options: {
        separator: '\n'
      },
      dist: {
        options: {
          banner: grunt.file.read('src/commons/wrappers/app.prefix'),
          footer: grunt.file.read('src/commons/wrappers/app.suffix')
        },
        src: [
          'libs/jquery/dist/jquery.min.js',
          'libs/slick-carousel/slick/slick.js',
          'src/bootstrap/*.js',
          'src/**/*.js',
          '<%= html2js.templates.dest %>'
        ],
        dest: 'dist/<%= pkg.path %>/js/<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        mangle: true,
        compress: {
          global_defs: {
            DEBUG: false
          },
          pure_funcs: [
            '$log.debug'
          ],
          dead_code: true
        }
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.path %>/js/<%= pkg.name %>.min.js'
      }
    },

    jshint: {
      options: {
        jshintrc: true,
        reporter: require('jshint-stylish')
      },
      gruntfile: ['Gruntfile.js'],
      configs: ['.bowerrc', '.jscs.json', '.jshintrc', 'package.json'],
      src: ['Gruntfile.js', 'src/**/*.js']
    },

    jscs: {
      gruntfile: ['Gruntfile.js'],
      src: ['Gruntfile.js', 'src/**/*.js']
    },

    connect: {
      server: {
        options: {
          livereload: 35730,
          hostname: '*',
          port: 9999,
          base: 'dist/<%= pkg.path %>'
        }
      }
    },

    less: {
      overlay: {
        options: {
          paths: ['src'],
          cleancss: true
        },
        src: ['src/styles.less'],
        dest: 'dist/<%= pkg.path %>/css/<%= pkg.name %>.css'
      }
    },

    cssmin: {
      css: {
        files: [{
          src: [
            'libs/slick-carousel/slick/slick.css',
            '<%= less.overlay.dest %>'
          ],
          dest: 'dist/<%= pkg.path %>/css/<%= pkg.name %>.min.css'
        }]
      }
    },

    watch: {
      configs: {
        files: ['Gruntfile.js', '.bowerrc', '.jscs.json', '.jshintrc', 'package.json'],
        tasks: ['_checkconfig', '_all']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['_js', '_jsdist'],
        options: {
          livereload: 35730
        }
      },
      templates: {
        files: [
          'src/components/**/*.html',
          'src/commons/icons/**/*.html',
          'src/structure/**/*.html'
        ],
        tasks: ['_templates', '_jsdist'],
        options: {
          livereload: 35730
        }
      },
      css: {
        files: ['src/**/*.less'],
        tasks: ['_css'],
        options: {
          livereload: 35730
        }
      },
      html: {
        files: ['*.html'],
        tasks: ['copy:index'],
        options: {
          livereload: 35730
        }
      }
    },

    compress: {
      dist: {
        options: {
          archive: 'dist/<%= pkg.path %>.zip'
        },
        files: [{
          cwd: 'dist/<%= pkg.path %>', src: ['**'], expand: true
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.task.registerTask('sleep', 'Sleep for N seconds.', function(delay) {
    if (arguments.length === 0) {
      return;
    }

    var done = this.async();
    if (delay) {
      setTimeout(done, delay * 1000);
    }
  });

  grunt.registerTask('_checkconfig', ['jshint:gruntfile', 'jscs:gruntfile', 'jshint:configs']);
  grunt.registerTask('_js', ['jshint:src', 'jscs:src']);
  grunt.registerTask('_templates', ['html2js:templates']);
  grunt.registerTask('_jsdist', ['concat:dist', 'uglify:dist']);
  grunt.registerTask('_copy', ['copy:images', 'copy:index']);
  grunt.registerTask('_css', ['less:overlay', 'cssmin:css', '_copy']);
  grunt.registerTask('_all', ['clean:dist', '_js', '_templates', '_jsdist', '_css', '_copy']);

  grunt.registerTask('default', ['_checkconfig', 'connect:server', 'sleep:1', '_all', 'watch']);

  grunt.registerTask('compile', ['_js', '_templates', '_jsdist', '_css', '_copy']);

  grunt.registerTask('package', ['clean:dist', 'compile', 'clean:temp', 'compress:dist']);

};
