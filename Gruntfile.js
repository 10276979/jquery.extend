module.exports = function(grunt) {
  // 项目配置
  grunt.initConfig({
    yuidoc: {
      compile: {
        name: 'gs',
        description: 'jquery方法扩展',
        version: '1.0',
        options: {
          paths: 'src',
          themedir: 'path/to/custom/theme/',
          outdir: 'doc'
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'jquery.extend.js': ['src/*.js']
        }
      }
    },
    jshint: {
      all: ['src/**/*.js']
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'yuidoc', 'uglify'],
        options: {
          interrupt: true,
        },
      },
    },
  });
  grunt.loadTasks('./node_modules/grunt-contrib-yuidoc/tasks');
  grunt.loadTasks('./node_modules/grunt-contrib-jshint/tasks');
  grunt.loadTasks('./node_modules/grunt-contrib-watch/tasks');
  grunt.loadTasks('./node_modules/grunt-contrib-uglify/tasks');
  grunt.registerTask('default', ['watch']);
};