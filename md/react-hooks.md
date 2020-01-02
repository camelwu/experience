---
title: hooks入门
tags:
  - javascript, react, hooks
categories: hooks
date: 2019-12-23 14:22:12
---
hooks 是react 16.8 引入的特性，允许在不写class的情况下操作state 和react的其他特性。
hooks 只是多了一种写组件的方法，使编写一个组件更简单更方便，同时可以自定义hooks把公共的逻辑提取出来，让逻辑在多个组件之间共享。直接看[官网](https://reactjs.org/docs/hooks-intro.html)会更好。
> hooks 在react.component里不生效
hooks常用api有：useState、useEffect、useContext、useReducer、useRef等。为function提供类component的功能。

## 为什么要使用hooks？

* 函数应用，提高渲染速度
* 大型复杂应用上下文
* 提高组件的复用

## 怎么用？
* useState

state在function是不能使用的。useState后就可以直接使用state，代码如下：

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
设置函数，一般命名为set前缀的驼峰型，像上面的count和setCount，`state`和`更新state`的方法
* useEffect

useEffect方法是在每次渲染之后执行，可以理解为class写法中的 componentDidMount / componentDidUpdate（为了方便理解可以这么理解，但不完全一样）
```
useEffect(didUpdate);
```
参数：function，在每次渲染之后执行，在函数里可以编写更新dom，添加订阅等。

参数返回值：function(可以不返回) 如果 didUpdate函数中返回了一个函数，这个函数会在组件卸载前执行(每次渲染都会执行)需要清除上次订阅的内容可以再这里面写。

执行条件：useEffect 的第二个参数是一个数组，只有当数组中的的值发生改变的时候才会调用effect，如果执行在第一次挂载和卸载的时候调用，只需要传一个[]空数组。

下面通过一个组件实例来说明

```
export function useMoveEffect() {
  // 第二个参数传了固定值 [] 
  // 相当于 componentDidMount
  useEffect(() => {
    // 实现拖拽逻辑
  }, []);
}

export function useDrawMarkEffect(cur) {
  useEffect(() => {
    // 实现水印逻辑
  }, []);
}

export function useResetEffect(cur); {
  // 第二个参数传了固定值 [ cur ] 
  // 相当于 componentDidUpdate 比较 cur
  useEffect(() => {
    // 实现重置逻辑
  }, [ cur ]);
}

function useOtherImageEffect(...) {
  useEffect(() => {
    // 实现image特有逻辑
  }, [ ... ]);
}

function ImageModal (props) {
  // 细分 Effect，方便复用
  useMoveEffect();
  useDrawMarkEffect();
  useResetEffect(props.cur);
  ...

  useOtherImageEffect(...);

  return <>
    ...
    <img ... />
  </>
  
}
```
根据上面的代码，那么export出来的函数，其它组件也可以进行调用，如下：
```
import { useMoveEffect, useDrawMarkEffect, useResetEffect } from './imageModal'

function useOtherHtmlEffect(...) {
  useEffect(() => {
    // 实现html特有逻辑
  }, [ ... ]);
}

function HtmlModal (props) {
  // 细分 Effect，方便复用
  useMoveEffect();
  useDrawMarkEffect();
  useResetEffect(props.cur);
  ...

  useOtherHtmlEffect(...);

  return <>
    ...
    <img ... />
  </>
  
}
```
以上，实现了生命周期中重复逻辑的复用。以后无论新增什么modal，都可以复用。做好文档工作，组件变得更小，开发速度更快。

* useContext
const value = useContext(MyContext);

获取context 的值，类似于class 写法中的static contextType = MyContext ,当使用了useContext会在context 的值发生改变的时候重新render。

参数 接收对象是React.createContext 的返回值
返回值 context 里的内容
## redux的概念和介绍

**如果你不知道是否需要 Redux，那就是不需要它。**

* store
  * 保存所有共享数据的容器，全局唯一
  * 通过createStore创建

* state
  * 某一时刻store里的数据对象，变化引发view改变，不可直接修改，只能通过action去修改
  * store.getState获得

* action
  * 用户改变state数据时需要触发出不同类型的action
  * type：发出action的类型，reducer根据类型去修改数据

* store.dispatch
  * action是静态函数，无法自动发出，需要dispatch去派发
  * store.dispatch(actionName())

* reducer
  * store在收到action后想要修改state，就需要根据action的type去计算后修改state触发view，这个计算过程就是reducer
  * 纯函数，输入一致输出必一致，只能返回一个新对象，不能直接修改state

* store.subscribe()
  * 监听state的改变，自动执行触发
  * 实例：connect高阶组件的实现

* connect实现
```bash
const connect = (mapStateToProps,mapDispatchToprops) => (Wrapcompont) =>{
    return class extends Component{
        state={
            allprops:{}
        }
        static contextTypes = {
            store: PropTypes.object
        }

        componentDidMount(){
            const store = this.context.store;
            console.log(this.context);
            this._update();
            store.subscribe(() => this._update());
        }

        //数据更新页面更新
        _update(){
            const store = this.context.store;
            const state = mapStateToProps?mapStateToProps(store.getState()):{};
            const dispatch = mapDispatchToprops?mapDispatchToprops(store.dispatch):{};
            this.setState({
                allprops:{...state,...dispatch,...this.props}
            })
        }

        render(){
            return <Wrapcompont {...this.state.allprops} />
        }
    }
}
```

### store的简单实现

* store提供了三个方法：getState、dispatch、subscribe
```bash
const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};
```

### reducer的拆分和合并

* 拆分
  * 根据不同的功能和属性划分拆分
  * 单一职责原则（易读易写易维护）

* 合并
  * combineReducers方法把多个reducer的合并成一个reducder，返回一个键值对对象
  * 获取数据是，根据对象的key值进行获取相应state

* 实现
```bash
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce(
      (nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
        return nextState;
      },
      {} 
    );
  };
};
```

### redux单一工作数据流

**操作不可逆，reducer为纯函数不可直接修改，返回新对象**

* 用户操作
* dispatch相应action
* action传递到全局store
* store根据action的type派发到相应reducer
* reducer计算返回新的state对象
* store.subscribe触发监听，更新view


### redux的缺点和优势

* 缺点：不能进行异步操作（需要中间件去做）
* 优点：用插件的方式去扩展，包容多种方式

### 中间件Middleware

**核心功能就是在发出action后过段时间再进行reducer操作，所以只能dispatch这一步进行异步操作**

* redux提供applyMiddleware方法来应用用到的中间件（可多个）
* createStore(reducer,initial_state,applyMiddleware(Middleware))
* 根据applyMiddleware中的排放顺序调用


### redux-thunk

**一个使用简单的异步中间件，普通的action会返回一个对象，进行异步操作的action会返回一个函数，对外暴露两个参数（dispatch，getState），方便异步操作完成后再次发出action，继续进行reducer操作**

```bahs
const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle));
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)));
  };
};
```

### react-redux

**用来连接redux和view，方便view发起action和redux数据更新后view的更新**

* connect：redux和react组件之间的桥梁，提供了数据的读取和操作
* provider： 通过Context方式注入store，使子组件可以获取store数据

* connect实现
```bash
const connect = (mapStateToProps,mapDispatchToprops) => (Wrapcompont) =>{
    return class extends Component{
        state={
            allprops:{}
        }
        static contextTypes = {
            store: PropTypes.object
        }

        componentDidMount(){
            const store = this.context.store;
            console.log(this.context);
            this._update();
            store.subscribe(() => this._update());
        }

        //数据更新页面更新
        _update(){
            const store = this.context.store;
            const state = mapStateToProps?mapStateToProps(store.getState()):{};
            const dispatch = mapDispatchToprops?mapDispatchToprops(store.dispatch):{};
            this.setState({
                allprops:{...state,...dispatch,...this.props}
            })
        }

        render(){
            return <Wrapcompont {...this.state.allprops} />
        }
    }
}
```

* Provider简单实现

```bash
class Provider extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.store)
    }

    static childContextTypes = {
        store: PropTypes.object
    }

    getChildContext = () =>{
        return {
            store: this.props.store
        }
    }

    render(){
        return (
            <div>
                {this.props.children}
            </div>
        )
    }

}
```
