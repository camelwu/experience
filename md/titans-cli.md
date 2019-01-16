# Titans
从零开始建立项目，开发通过CV大法是一件让人想死的事情。各种各样的脚手架工具都特别方便，yoeman，express-generator和vue-cli等等。  
这些cli最核心的功能都是能够快速搭建一个完整的项目的结构，开发者只需要在生成的项目结构的基础上进行开发即可，非常简单高效。泰坦这么牛逼的名字，业务扩大后，就这么几个人 没个脚手架怎么行？  
写个脚手架，配合西峰后续的组件库，由我们自定义模版生成项目，或在项目中根据json生成目录和对应文件  
## 编写
首先建立项目，在package.json里面写入依赖并执行npm install：
```
  "dependencies": {
    "chalk": "^1.1.3",
    "co": "^4.6.0",
    "co-prompt": "^1.0.0",
    "commander": "^2.9.0"
  }
```
在根目录下建立\bin文件夹，在里面建立一个无后缀名的titans文件。这个bin\titans文件是整个脚手架的入口文件，所以我们首先对它进行编写。

首先是一些初始化的代码：
```
  #!/usr/bin/env node 
  'use strict'
  // 定义脚手架的文件路径
  process.env.NODE_PATH = __dirname + '/../node_modules/'

  const program = require('commander')

  // 定义当前版本
  program
      .version(require('../package').version )

  // 定义使用方法
  program
      .usage('<command>')
  // 添加
  program
    .command('add')
    .description('Add a new template')
    .alias('a')
    .action(() => {
      require(res('add'))
    })
  // 列表
  program
    .command('list')
    .description('List all the templates')
    .alias('l')
    .action(() => {
      require(res('list'))
    })
  // 定义和clone
  program
    .command('init')
    .description('Generate a new project')
    .alias('i')
    .action(() => {
      require(res('init'))
    })
  // 删除
  program
    .command('delete')
    .description('Delete a template')
    .alias('d')
    .action(() => {
      require(res('delete'))
    })
  // 还没写完
  program
    .command('map')
    .description('Place files to diffirent position')
    .alias('m')
    .action(() => {
      require(res('map'))
    })

  program.parse(process.argv)

  if(!program.args.length){
    program.help()
  }
```
commander可以直接到[npmjs](https://www.npmjs.com/package/commander)去看；其他包（chalk，co等）在github或npmjs上都可以找到相应的文档。  
如果有兴趣，可以看看Yeoman；现成的脚手架生成工具，但是定制化程度和方便性不是非常适合当前咱们团队的情况。  
还有其他小项目的cli，Hbuild使用hbuild-cli命令行工具，可快速生成项目启动套件，学习成本低，该套件包含如下特点：
Features

+ Vue2 / Vue-Router / Vuex (optional)
+ Hot reloading for single-file components
+ Webpack 2 
+ babel (default)
+ LESS/SASS/Stylus (optional)
+ ejs/mustache/art-template (optional)
+ React / React-Router (optional)
+ zepto
+ autoprefixer (vue support)
+ mock server
+ eslint
+ Support for building multi-page applications
+ offline mode support
+ file hash

## 安装
等我sinopia装好了，就可以
```
npm install Titans-cli -g
```
现在
```
git clone git@gitlab.lvyuetravel.com:camel/technology-share.git

cd technology-share && npm install

npm link
```

## 使用
打开命令工具输入 `Titans` or `Titans -h` , 可以看到下面的信息:
```
  Usage: Titans <command>


  Commands:

    add|a      Add a new template
    list|l     List all the templates
    init|i     Generate a new project
    delete|d   Delete a template

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

> 注意： 在 `MacOS`系统里, 执行 `add` 和 `delete` 需要有目录权限，要么`chmod 0700 ` 要么 `sudo`

## 命令说明
### add | a
增加模版到 `templates.json`，后续可以通过`Titans`的init生成页面或项目
```
$ Titans add

? Set the custom name of the template: my-first-template
? Owner/name of the template: Titans
? Branch of the template: new
┌───────────────────┬────────────────────┬────────┐
│ Template Name     │ GitLink            │ Branch │
├───────────────────┼────────────────────┼────────┤
│ my-first-template │ gitlab:git@gitlab**│ new    │
└───────────────────┴────────────────────┴────────┘
✔ New template has been added successfully!
```
`Titans` use [download-git-repo](http://gitlab.lvyuetravel.com/camel/technology-share.git) to down load git repos. After answering 3 questions, you'll add a new template to `Titans`.

### list | l
展示已有的模版列表.
```
$ Titans list

┌───────────────────┬────────────────────┬────────┐
│ Template Name     │ GitLink            │ Branch │
├───────────────────┼────────────────────┼────────┤
│ my-first-template │ gitlab:git@gitlab**│ new    │
├───────────────────┼────────────────────┼────────┤
│ my-secon-template │ gitlab:git@gitlab**│ new    │
└───────────────────┴────────────────────┴────────┘
```

### init | i
在添加了模版后可以通过这个命令，copy或clone项目到相应的目录下
```
$ Titans init

? Template name: my-first-template
? Project name: my-project
? Where to init the project? ../
⠹ Downloading template...

New project has been initialized successfully!
```

暂时第一步初稿先做成这样的，后续会再增加通过现有的module生成页面的代码。

### delete | d
没做修改，添加的不对直接删掉重来
```
$ Titans delete

? Which template you want to delete? my-second-template
┌───────────────────┬────────────────────┬────────┐
│ Template Name     │ GitLink            │ Branch │
├───────────────────┼────────────────────┼────────┤
│ my-first-template │ gitlab:git@gitlab**│ new    │
├───────────────────┼────────────────────┼────────┤
│ my-secon-template │ gitlab:git@gitlab**│ new    │
└───────────────────┴────────────────────┴────────┘
✔ Template has been deleted successfully
```

## Template
模版，组件组合。--未完待续
