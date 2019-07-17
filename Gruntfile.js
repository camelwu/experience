module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      concat: {
        foo: {
          // concat task "foo" target options and files go here.
        },
        bar: {
          // concat task "bar" target options and files go here.
        },
      },
      uglify: {
        options: {// 任务级别Options，覆盖默认值
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'lib/debounce.js',
          dest: 'build/debounce.min.js'
        }
      }
    });
  
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify']);
  
  };