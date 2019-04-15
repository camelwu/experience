## react project architecture
因为dom是一个树形结构，json也是一个树形结构，于是可以用json生成html。
因为css是一个层叠结构，json也能表达层叠结构，于是可以用json生成css。
有关于React+redux的项目架构一直存在多种声音，目前主流的主要有三种：
+ 按照类型
+ 按照页面功能
+ Ducks

### 按照类型
这里的类型指的是文件在项目中充当的角色类型，比如这个文件是一个component（展示组件），container（容器组件），在redux状态管理当中有，action，reducer等，这些不同角色的文件都放在一个单独的文件夹里，这种样式的结构也是react官方所推荐的结构。这种结构如下
--------------------- 
├── README.md
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src
│   ├── action
│   │   └── action.js
│   │   └── index.js
│   ├── components
│   │   ├── App
│   │   │    └── index.css
│   │   │    └── index.js
│   │   └── Home
│   │        └── index.css
│   │        └── index.js
│   ├── container
│   │   └── connectApp.js
│   ├── index.css
│   ├── index.js
│   ├── reducers
│   │   ├── actor.js
│   │   └── index.js
│   └── store.js
└── yarn.lock
使用这种结构组织项目，每当增加一个新功能的时候，需要再containers，components文件夹下增加这个功能需要的组件，还需要再actions，reducers文件夹下分别添加Redux管理这个功能使用到的action，reducer，此时如果actionType放在另外一个文件夹，还需要在这个文件夹下增加新的actionType，所以开发一个新的功能，需要再这些文件夹下频繁的切换已修改不同的文件。如果项目比较小，问题不大，如果对于一个规模比较大的项目使用这种项目结构非常的麻烦。

### 页面功能

既一个页面功能对应一个文件夹，这个页面功能所用到的container，component，action，reducer等文件都放在这个文件夹下。如下为按照页面功能划分的项目结构示列
--------------------- 
├── README.md
├── package.json
├── src
│   ├── feature01
│   │   ├── components
│   │   │    └── cp.js
│   │   ├── action.js
│   │   ├── container.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── feature02
│   │   ├── components
│   │   │    └── cp.js
│   │   ├── action.js
│   │   ├── container.js
│   │   ├── index.js
│   │   └── reducer.js
│   ├── index.css
│   ├── index.js
│   └── router
│       └── index.js
└── yarn.lock
这种结构好处很明显，一个页面功能使用到的组件，状态和行为都在同一个文件夹下，方便开发和维护，同时易于扩展，github上很多的脚手架也选择了这种目录结构，不足之处是依然同按角色划分面临同样的问题，改变一个功能需要频繁的在reducer，action，actionType等不同文件夹间切换。另外redux将整个的应用状态放在一个store中来管理，不同功能模块之间可以共享store中的部分状态(项目越复杂，这种场景会越多)，共享的状态应该放到哪一个页面文件夹下也是一个问题，这些问题归根结底是因为redux中状态管理逻辑并不是根据页面功能划分的，它是页面功能之上的一种抽象。

### Ducks

ducks指的是一种新的redux项目目录结构，它提倡将相关的reducer，action，actionType和action creaters写在一个文件里面，本质上是以应用状态作为划分模块的依据，而不是以页面的功能作为划分模块的依据，这样，管理相同状态的依赖都在同一个文件中，无论哪个容器组件需要这部分状态，只需要引入管理这个状态的模块文件即可。  
在前两种结构中，当container需要使用actions时，可以通过import * as actions from 'path/to/actions.js'的方式一次性的把一个action的文件中中所有的action creates都引入进来。但在使用Ducks结构时，action creater和reducer定义在同一个文件中，import*的导入方式会把reducer也导入进来(如果action types也被export ，那么还会导入action type)。为了解决这个问题。我们可以把action creators和action types定义到一个命名空间中:
```
    // widget.js
    // Actions定义到types命名空间下
    export const types={
        LOAD:'widget/LOAD',
        CREATE:'widget/CREATE',
        UPDATE:'widget/UPDATE',
        REMOVE:'widget/REMOVE'
    }

    const initialState={
        widget:null,
        isLoading:false
    }

    //Reducer

    export default function reducers(state=initialState,action={}){
        switch (action.stype){
            types.LOAD:
            //...
            types.CREATE:
            //....
            types.UPDATE:
            //....
            types.REMOVE:
            //...
            default:
            return state;
        }
    }

    //Action Creators
    export const actions={
        loadWidget:function(){return {type:types.LOAD};},
        createWidget:function(widget){
            return {type:types.CREATE,widget};
        },
        updateWidget:function(widget){
            return {types:type.UPDATE,widget};
        },
        removeWidget:function(widget){
            return {type:types.REMOVE,widget};
        }
    }
```
整体的目录结构如下:
--------------------- 
├── README.md
├── package.json
├── src
│   ├── components
│   ├── containers
│   │   └── feature01
│   │   │    └── components
│   │   └── index.js
│   ├── index.css
│   ├── index.js
│   └── redux
│       ├── index.js
│       ├── modules01.js
│       └── modules02.js
└── yarn.lock

这样在container里面使用它的时候就可以通过import {actions} from 'path/to/modeuls.js'引入需要的对象，避免了不必要的引入，也避免了逐个引入action creaters的繁琐


src/                 所有源代码存放的路径
  app.js             整个应用的入口
  views/             应用中某个页面的入口文件，一般为路由组件
    Home.js          例如，首页的入口就是Home.js
    Home.css         Home页面对应的样式
    HomeRedux.js     Home页面中所有与Redux相关的reducer、action creator的汇总，即components/Home/下所有*Redux.js的汇总
  components/        所有应用的组件
    Home/            例如，views/中一个名为Home的view，则在components/中就有一个名为Home的子文件夹
      Table.js       Home页面中的一个列表组件
      Table.css      列表组件对应的样式
      TableRedux.js  列表组件的reducer、action creator及action type，整合在一个文件中
      Modal.js
      Modal.css
      ModalRedux.js
    shared/          不归属于任何view的组件，如一些公共组件等
  containers/
    DevTools.js      配置DevTools
    Root.js          一般被app.js依赖，用于根据环境判断是否需要加载DevTools
  layouts/           布局相关的组件及样式，如菜单、侧边栏、header、footer等
  redux/             Redux store相关的配置
    reducers.js      整个应用中所有reducer的汇总
  routes/            路由相关的配置
  utils/             工具函数、常量等
  styles/            全局公共样式
  app.css            应用主样式表