# grunt
虽然已经没什么人使用，稍微了解下使用；中文官方上需要使用者首先全局安装`grunt`，使用全局的脚手架cli和项目中的`Gruntfile.js` 或 `Gruntfile.coffee` 才能使用；确实有点奇怪，本来就是一个`fs`操作和串行任务的东西，项目依赖安装不是更好？

## 开始
+ "wrapper" 函数
每个 `Gruntfile` （和`grunt`插件）都遵循同样的格式，你所书写的Grunt代码必须放在此函数内：  

```
module.exports = function(grunt) {
  // Do grunt-related things in here
};
```
需要在`Gruntfile`注册一个个的任务，如下：  
```
grunt.initConfig({
    uglify:{},
    jshint:{},
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    // 默认被执行的任务列表。
    grunt.registerTask('default', ['uglify','jshint']);
})
```
+ 加载 Grunt 插件和任务
像 concatenation、[minification]、grunt-contrib-uglify 和 linting这些常用的任务（task）都已经以grunt插件的形式被开发出来了。只要在 package.json 文件中被列为dependency（依赖）的包，并通过npm install安装之后，都可以在Gruntfile中以简单命令的形式使用：  
```
grunt.initConfig({
    *
    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
})
```
也就是说常见的插件还算全面，不需要自己再写。但是需要`Task`一个一个执行，特别是不支持es6，需要先转译。

### 自定义任务
通过定义 default 任务，可以让Grunt默认执行一个或多个任务。在下面的这个案例中，执行 grunt 命令时如果不指定一个任务的话，将会执行uglify任务。这和执行grunt uglify 或者 grunt default的效果一样。default任务列表数组中可以指定任意数目的任务（可以带参数）。
```
// Default task(s).
grunt.registerTask('default', ['uglify']);
```
如果Grunt插件中的任务（task）不能满足你的项目需求，你还可以在Gruntfile中自定义任务（task）。例如，在下面的 Gruntfile 中自定义了一个default 任务，并且他甚至不依赖任务配置：
```
module.exports = function(grunt) {

  // A very basic default task.
  grunt.registerTask('default', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};
```
特定于项目的任务不必在 Gruntfile 中定义。他们可以定义在外部.js 文件中，并通过grunt.loadTasks 方法加载。

