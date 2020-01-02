## React组件库

### 目标
1. 自动化或半自动化开发  
通过配置文件，命令问题 生成可直接用的页面容器。  
需要：脚手架工具、配置文件、模版业务页面的编写；  
2. 自建的UI库、组件库  
能够导出sketch library，实现前端与设计之间的协作。  
需要：通过Material-Design重新编写一套UI库，现有的antD需要逐步替换；   


### 任务拆解
+ 第一阶段：  
过程：工具类 & UI库 -> 业务组件库 -> 复合组件容器 -> 商业逻辑页面  
核心：基础积累  
+ 第二阶段：  
过程：脚手架 & 模版（配置json） -> 页面 | 容器  -> 构建 & 发版  
核心：逐步过渡到项目工程化，开发自动化或半自动化   
+ 第三阶段：  
过程：重写（UI库与业务组件库）-> 复合组件容器升级 -> 商业逻辑页面升级  
核心：在前面两个阶段积累基础上，实现与设计、产品的协作，达到design to code

### 阶段1
+ 开发通过[npm-scripts]方式进行开发和升级  

搭建私有库，将工具类、常用UI组件、业务容器 发布到私有库；  
举例：某工具类titans，通过
```
npm install titans
```
引入到开发中，遇到需要更新迭代的需求，在规范文档允许范围内进行升级和发布；其他同学如也需使用新功能，可通过
```
npm update titans@version -S
```
方式进行升级，并记录到package.json。  
> 不同的版本适应不同的项目和线上环境，非同一版本，只要不升级，互相功能不干扰；今后需要约定所有的依赖包需要锁定版本号。

sinopia不再维护，建议采用vedaccio 私有库[操作](./vedaccio.md)

+ 类、库开发  
分支的开发
需要采用[GitFork](./forking.md)工作流，CR机制等都需引入。 

+ 文档  

采取两种自动化的方式：  

1. ant-D 库方式 （采取已有的手动方式，或架构师1周时间写个自动化工具）  
2. 注释生成方式 [jsDoc](./JSDoc.md)  

+ js库 & 组件库 基础架构  
js功能库  

```
// ly-utils
├─min/                  （打包文件）
├─scripts
│  ├─rollup　　
│  ├─build　
│  └ ...
├─src
│  ├─array
│  ├─class
│  ├─cookie
│  ├─time
│  ├─object
│  ├─money
│  ├─comment
│  ├─goods
│  ├─logs
│  ├─...
│  └─index.js
├─test
│  └─test.js
├─.babelrc
├─.gitignore
├─.travis.yml
├─LICENSE
├─README.md
├─index.js
├─package-lock.json
└─package.json
```

UI组件库：  
功能对应一个文件夹，这个页面功能所用到的container，component，action，reducer等文件都放在这个文件夹下。如下为按照页面功能划分的项目结构示列：  

```
project
│   README.md
│   index.js    
│
├───src
└───feature1
│   │   action.js
│   │   contain.js
│   │   index.js
│   │   reducer.js
│   └───components
│       │   file111.js
│       │   file112.js
│       │   ...
│   
└───feature2
│   │   file021.js
│   │   file022.js
│   │   ...
│
└───node_modules
    │   jslib(lvyue)
    │   orther
    │   ...
```

功能使用到的组件，状态和行为都在同一个文件夹下，方便开发和维护，同时易于扩展；之前开发的js工具库可以作为依赖安装到这里

文档-待续

#### 阶段工作：  

<table border="1px" align="center" bordercolor="black" width="100%">
<thead>
  <tr>
    <th width="10%">任务</th>
    <th width="10%">实现方式</th>
    <th width="8%">前置or依赖</th>
    <th width="5%">工作量</th>
    <th >说明</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td> 私有库 </td>
    <td> sinopia</td>
    <td> 内网机器</td>
    <td> 完成</td>
    <td> 所有的库、包都可发布到这里<br/>
    [操作手册](./verdaccio.md)  <br/>
    [传送门](https://github.com/verdaccio/verdaccio) </td>
  </tr>
  <tr>
    <td> 文档规范 </td>
    <td> 依托airbnb等公司已有的文档规范，结合公司情况 </td>
    <td> 时间支持 </td>
    <td> 请见说明 </td>
    <td>
<li> 命名空间定义</li>
适用工具类和UI库名 <br/>
+ 组件代码规范 <br/>
讨论并编写文档<br/>
git钩子+eslint工具 -- 需确认何时采用   <br/>
+ 样式代码规范   <br/>
讨论并编写文档      -- 采用airbnb或其他开源文档 1pd <br/>
+ 组件开发流程   <br/>
初始化   <br/>
Coding   <br/>
Demo   <br/>
讨论并编写文档      -- 本需要全员参与，现阶段暂时由武松一人负责，暂定7pd <br/>
+ 组件测试   <br/>
通过编写自动化测试来覆盖线上某些场景，前端爬虫进行监控；要不就需要QA的资源 <br/>
+ 组件维护   <br/>
讨论并编写文档 -- 谁需要谁进行开发和发版，并更新注释文件和文档。   <br/>
+ 组件发包   <br/>
讨论并确认人选      -- 1 Hour   <br/>
+ 组件文档   <br/>
此工作依赖：组件注释的规范和自动化工具的模版编写 
    </td>
  </tr>
  <tr>
    <td> 工具类库 </td>
    <td> UMD模式，功能拆分；git+sinopia或git submodule方式 </td>
    <td> 架构师整理、日常开发收集业务需求 </td>
    <td> 》》 </td>
    <td> 字典类 <br/>业务类 <br/>工具类 <br/></td>
  </tr>
  <tr>
    <td> UI组件库 </td>
    <td> 按ant-D标准进行设计封装</td>
    <td> 时间 <br/>测试 <br/>构建升级 </td>
    <td> 未评估 </td>
    <td>
    能够支撑现有业务和速度的UI库 <br/>
    高复用性 <br/>
    更快的速度 <br/>
    从现有的module里整理，可能需要升级webpack版本做一些优化方面的工作 
    </td>
  </tr>
  <tr>
    <td> 业务复合组件库 </td>
    <td> -  </td>
    <td> 时间 <br/>测试 <br/>UI库 </td>
    <td> 》》 </td>
    <td>
列表组件 -- 4pd   <br/>
导出组件 -- 1pd   <br/>
搜索组件 -- 2pd   <br/>
弹层组件 -- 16pd（各频道都有不同）   <br/>
复合组件 -- 20pd（将以上各个组件和业务逻辑进行整合）   <br/>
详情页面 -- 15pd（已知5种详情页面）   </td>
  </tr>
  <tr>
    <td> 商业逻辑页面（容器） </td>
    <td> -</td>
    <td> 时间 <br/>测试 <br/>业务复合组件库 <br/></td>
    <td> 未评估 </td>
    <td> - </td>
  </tr>
  <tr>
    <td> 交叉替换方案（微服务拆分） </td>
    <td> - </td>
    <td> 运维 <br/>测试 <br/>业务复合组件库</td>
    <td> -  </td>
    <td> [初始方案](./FE-microService.md) </td>
  </tr>
  </tbody>
</table>

完成后分拆并发布

### 阶段2
有了阶段1的积累后，可以开始向半自动化方向演进；  
1. 模版或可用配置文件  
由第一阶段研发成果去完成，日常的工作积累中逐步整理出高复用性和适用业务的模版


2. 脚手架工具  

#### 安装
切换nrm，见上面例子  
```
npm install Titans-cli -g
```
或者
```
git clone git@gitlab.lvyuetravel.com:camel/technology-share.git

cd technology-share && npm install

npm link
```

#### 使用
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
[cli手册](./titans-cli.md) 

#### 阶段工作：  

<table border="1px" align="center" bordercolor="black" width="100%">
<thead>
  <tr>
    <th width="10%">任务</th>
    <th width="10%">实现方式</th>
    <th width="8%">前置or依赖</th>
    <th width="5%">工作量</th>
    <th >说明</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td> 模版或可用配置文件 </td>
    <td> 每周技术分享</td>
    <td> 时间<br>
    阶段1成果</td>
    <td> -</td>
    <td> 第一阶段的符合组件、商业容器的需求采集和逻辑抽离 <br/>
    在业务需求没法在组件库、容器中找到的情况下，通过工具来生成页面 <br/></td>
  </tr>
  <tr>
    <td> titans-cli </td>
    <td> commander、chai、fs等 </td>
    <td> 时间 </td>
    <td> - </td>
    <td> 完成对模版的添加、git库的下载、模版库表的list<br/>
    可添加构建、发版等等功能 </td>
  </tr>
  </tbody>
</table>


### 阶段3
在组件和业务到了一定的成熟度后，对于应用层商业逻辑库不做调整，改写依赖的UI库。完成后再发版，版本不变情况下，项目不发生影响。  
期间会面临功能向下无法兼容的情况，届时可根据情况进行调整。坚持核心：预期=>复盘=>调整


### 意外情况
开发环境一般不会暴露太多问题，需要实际应用场景的检验；所以，搭建一个（伪）UAT环境并进行灰度发布很有必要。    
并，建立《紧急事件》预案，情况list和处理方式都需要。  
  

