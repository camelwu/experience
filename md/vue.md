# vue
渐进式开源框架，学习成本很低，功能自由组合；不兼容IE9以下，对象更新有点不舒服。

## 使用
所有的框架学习都从使用开始，不得不说vue的使用非常简单，脚手架方式或页面引入方式模版、样式和脚本的分离让初级或从切图转过来的同学非常容易上手。
```

```
### 理解
通过object.define()方式进行双向数据绑定（劫持和事件广播）因其双向绑定的特性，所以生命周期相对简单，线性的。  
从beforecreate->created->mounted
### 常见问题
路由变化页面数据不刷新问题
setTimeout/setInterval(泛指异步回掉函数的this指向)this指向改变，无法用this访问VUe实例
setInterval路由跳转继续运行并没有及时进行销毁
vue 滚动行为用法,进入路由需要滚动到浏览器底部 头部等等
实现vue路由拦截浏览器的需求,进行 一系列操作 草稿保存等等
v-once 只渲染元素和组件一次，优化更新渲染性能
vue本地代理配置 解决跨域问题,仅限于开发环境
部署服务器

1. 路由变化页面数据不刷新问题
出现这种情况是因为依赖路由的params参数获取写在created生命周期里面,因为相同路由二次甚至多次加载的关系 没有达到监听，退出页面再进入另一个文章页面并不会运行created组件生命周期,导致文章数据还是第一次进入的数据

解决方法：watch监听路由是否变化
```
 watch: {
 // 方法1
  '$route' (to, from) { //监听路由是否变化
    if(this.$route.params.articleId){// 判断条件1  判断传递值的变化
      //获取文章数据
    }
  }
  //方法2
  '$route'(to, from) {
    if (to.path == "/page") {    /// 判断条件2  监听路由名 监听你从什么路由跳转过来的
       this.message = this.$route.query.msg     
    }
  }
  
}
```
2. 异步回调函数中使用this无法指向vue实例对象
```
//setTimeout/setInterval ajax Promise等等
data(){
  return{
    ...
  }
},
methods (){
     setTimeout(function () {   //其它几种情况相同
      console.log(this);//此时this指向并不是vue实例 导致操作的一些ma'f
    },1000);
}
```
解决方案 变量赋值和箭头函数

var和let的区别
```
 //使用变量访问this实例
let self=this;   
    setTimeout(function () {  
      console.log(self);//使用self变量访问this实例
    },1000);
    
 //箭头函数访问this实例 因为箭头函数本身没有绑定this
 setTimeout(() => { 
   console.log(this);
 }, 500);
```
3. setInterval路由跳转继续运行并没有及时进行销毁
比如一些弹幕，走马灯文字，这类需要定时调用的，路由跳转之后，因为组件已经销毁了，但是setInterval还没有销毁，还在继续后台调用，控制台会不断报错，如果运算量大的话，无法及时清除，会导致严重的页面卡顿。

解决办法：在组件生命周期beforeDestroy停止setInterval
```
//组件销毁前执行的钩子函数，跟其他生命周期钩子函数的用法相同。
beforeDestroy(){
     //我通常是把setInterval()定时器赋值给this实例，然后就可以像下面这么停止。
    clearInterval(this.intervalId);
},
```
4. vue 滚动行为用法,进入路由需要滚动到浏览器底部 头部等等
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 
vue-router 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。
注意: 这个功能只在支持 history.pushState 的浏览器中可用。
路由设置如下: 详情猛戳
```
 const router = new VueRouter({
   mode: 'history',
 scrollBehavior (to, from, savedPosition) {
     if (savedPosition) { //如果savedPosition存在，滚动条会自动跳到记录的值的地方
       return savedPosition
     } else {
       return { x: 0, y: 0 }//savedPosition也是一个记录x轴和y轴位置的对象
      }
     }，
   routes: [...]
 })
```
5. 实现vue路由拦截浏览器的需求,进行一系列操作 草稿保存等等
场景：
为了防止用户失误点错关闭按钮等等，导致没有保存已输入的信息(关键信息)。
用法：
```
//在路由组件中：
...
beforeRouteLeave (to, from, next) {

  if(用户已经输入信息){
    //出现弹窗提醒保存草稿，或者自动后台为其保存
    
  }else{
    next(true);//用户离开
  }

}
```
还有beforeEach、beforeRouteUpdate这些生命周期函数 详情猛戳

6. v-once 只渲染元素和组件一次，优化更新渲染性能
v-once这个指令相信大家用的很少,不过个人感觉还是挺实用的！
只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
这个就不举例子了 直接猛戳这 v-once

7. vue本地代理配置 解决跨域问题,仅限于开发环境
这个本地代理用来解决开发环境下的跨域问题,跨域可谓老生常谈的问题了,proxy 在vue中配置代理非常简单

//比方说你要访问 http://192.168.1.xxx:8888/backEnd/paper这个接口
//配置  config.js下面proxyTable对象
proxyTable: {
            '/backEnd':{
                target:'http://192.168.3.200:8888', //目标接口域名有端口可以把端口也写上
                                                    //或者prot本地起服务端口与服务端统一
                changeOrigin:true,    
            }
},
// 发送request请求
   axios.get('/backEnd/page')  //按代理配置 匹配到/backEnd就代理到目标target地址
    .then((res) => {
       console.log(res) // 数据完全拿得到  配置成功
      this.newsList = res.data
    }, (err) => {
      console.log(err)
    })
    
8. 本地开发 没有任何问题 部署服务器 就404啊这些问题
由于前端路由缘故，单页面应用应该放到nginx或者apache、tomcat等web代理服务器中，千万不要直接访问index.html，同时要根据自己服务器的项目路径更改react或vue的路由地址

注意点

1： vue-router的 history 模式
2： 服务nginx配置

