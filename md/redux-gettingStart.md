---
title: redux入门
tags:
  - javascript
categories: redux
date: 2019-08-15 14:22:12
---

### 为什么要使用redux？为何出现？

* 大型复杂应用（大部分可能不需要）
* 组件间的通讯，数据状态共享
* 全局状态改变
* 修改另一组件状态
* 数据状态可预测

### redux的历史

* redux的前身flux
* 函数式编程

### redux的概念和介绍

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