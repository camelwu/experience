# MV*设计模式
现在各路框架，各种MV*的写法一大堆，那么是通过什么方法来进行M=>V=>VM呢？其实所有的模式都是通过MVC演变而来   
那么MVC是如何来实现的呢？我们结合现在框架的实现原理，简单做个解释和说明  
浏览器历史记录有两种：1、Hash，2、History；如在pc上操作，那么backspace按键，就是回退键都可生效。

## Hash
为了方便大家理解，controller参数对应要调用的方法或者说页面，首页、列表和详情；我们将数据调用的model方法封装好，与不同的controller解耦，如下：  
1. 列表页`www.domain.com/#controller=list&classid=89004`
2. 详情页`www.domain.com/#controller=detail&id=89004`

### hash方式的MVC
js监听hash并获取参数，调用相应的控制函数
```
/* 监听 */
window.onHashchange = function(){
  /* controller，下面只写list和detail */
  if(getHashPara('controller')=='list'){
    /*列表页*/
    list_pager();
  }else{
    /*详情页*/
    detail_pager();
  }
}
/* 正则处理并获取参数 */
function getHashPara(n){
  let hashstr = window.location.hash.substr(1),
  reg = new RegExp('(^|&)'+n+'=([^&]*)(&|$)'),
  res = hashstr.match(reg);
  if (res != null) return unescape(res[2]);
  return null;
}
/* 获取api数据并生成模版，插入到Dom中 */
function list_pager(){
  var data = fetch('list','id')
  /* view和data很难分离 */
  var view = `<ul>
      <li></li>
      <li></li>
      <li></li>
  </ul>`
  dom.innerHTML = view;
}
/* 封装ajax方法 */
function fetch(type,id){
  return ajax.get|post();
}
```

## History
H5之前常用的history方法如下：
```
window.history.back();
window.history.forward();
window.history.go(-1);
window.history.go(1);
```
H5提供了History/State的 API（pushState，replaceState，onPopState）

### History实现
```
/* 添加历史记录改变 */
var stateObj = { foo: "bar" };
window.history.pushState(stateObj, "pages标题title", "bar.html");
/*
也可以进行替换，注意是**替换**
window.history.replaceState({state:3}, "State 3标题title", "?state=3");
*/
window.onPopState = function() {
  var currentState = history.state;
  /*根据currentState，你的处理controller*/
};
```
所以，hash和history的mvc实现大同小异  

当history实体被改变时，popstate事件将会发生。如果history实体是有pushState和replaceState方法产生的，popstate事件的state属性会包含一份来自history实体的state对象的拷贝，当你浏览会话历史记录时，不管你是点击前进或者后退按钮，还是使用history.go和history.back方法，popstate都会被触发。

## 虚拟Dom

大家都知道，对dom持续操作，会导致不断重绘和重排，渲染的性能会一直下降，为了解决这个问题，前端圈推出了createflag等方式，但性能还是不行；所以有了大厂提出虚拟dom的做法；

待续，请有兴趣的同学帮助写完这个文档。
