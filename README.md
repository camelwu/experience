# Front-End知识
前端的基础知识看似很少：html、css、js，实则不然；随着这些年前端工程化、自动化盛行还有大量优秀框架的产生，已经让没太更新知识的人捉襟见肘。这个blog把我自己的经验结合其他优秀前端分享的知识做一个整理和沉淀。  

从打开浏览器输入网址，到页面显示出来，拢共分几步？  
答：5步（粗略）  
第一步：解析DNS  
输入域名后对域名进行逐级查找，从运营商到国家级域名服务器再到美国根节点，不管是域名还是IP，都可以返回数据或不返回，所以伟大的墙；
第二步：与服务器建立http连接  
拿到域名对应服务器的IP地址后进行TCP/IP连接，三次牵手通信，DDoS和DOS攻击就是针对这个过程的特点来进行。
第三步：服务器处理请求并返回报文  
服务器根据请求类型、URI地址解析并生成html（包头、包体）返回给客户端，早期服务端统一输出的时代SQL脚本注入就是在请求阶段进行的。并且，面试也经常会问到的报文结构；以http1.1为例，举一个最简单的请求例子：
> Request
```
POST /index.html HTTP/1.1
HOST: www.XXX.com
User-Agent: Mozilla/5.0(Windows NT 6.1;rv:15.0) Firefox/15.0

Username=admin&password=admin
```

> Response
```
头：
HTTP/1.1 200 OK
Content-Encoding: gzip
Content-Type: text/html;charset=utf-8
报体：
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>Document</title>
</head>
<body>
    <p>this is http response</p>
</body>
</html>
```
我们打开chrome浏览器，在network里，找到第一个html的请求就可以看到最详细完整的内容，另外，现在http2.0和[https](https://github.com/camelwu/experience/blob/master/md/security.md)的安防加密方式也需要了解  

https
第四步：浏览器拿到报文数据开始加载  
浏览器拿到数据了，开始加载和解析，css和js文件都是带一定阻塞性的，就有了文件包管理的点。
第五步：浏览器开始进行解析和渲染  
首先解析html和css，并生成dom树，在这个阶段就要注意重排和重绘两个点，也是dom操作需要注意的点。


es6
Generator等


移步链接 [思维导图](https://github.com/camelwu/experience/blob/master/md/Modular.md) 

## expericences
移步链接 [优化](https://github.com/camelwu/experience/blob/master/md/optimize.md) 
## 模块化发展
移步链接 [模块化](https://github.com/camelwu/experience/blob/master/md/Modular.md) 
# mv*前端框架
## mvc
module+view+control，数据、视图和控制器分离，相对独立，各自运行。最典型的也最容易理解的是PHP，天然的mvc模式；数据处理有专门的部分（query参数=>SQL查询=>数据输出）；control控制器做为公用库类，处理相应的业务逻辑；smarty模版直接把内容进行输出。如果换成mcv或cmv会更好理解，之所以提PHP是因为现在前端上的mvc模式也是类似的做法。  
从param参数中拿到对应的方法C，获取数据M，返回数据渲染到视图上V。简单的两个例子，请移步链接 [mvc模式](https://github.com/camelwu/experience/blob/master/md/mvc.md) 
## mvvm
从Angular开始，开启了前端只需要注重数据和逻辑的开放式，但事实上各个框架的基因决定了其应用场景和适用的团队
### Angular

### react 
prereact
nervjs
anujs
next.js

[react文档](https://doc.react-china.org/docs/refs-and-the-dom.html)
### RN

### vue
vue的双向绑定原理
vue组件通信方法
### weex入坑


## node
[文档](http://javascript.ruanyifeng.com/nodejs/process.html)
+ koa2 实例应用
[链接](http://github.com/camelwu/gome_trade)
+ express+mongoDB
[链接](http://github.com/camelwu/nem)
## material-UI
[文档](https://material-ui.com/getting-started/example-projects/)

## interview





new的时候具体执行了什么东西

实现一个函数，利用js高级特性实现并行请求，结果按顺序返回

lodash 的 熟悉



了解jsbridge原理



process.nextClick(function(){console.log('next click!')})


缓存技术（服务器、浏览器）

实现长连接

通过Javascript类模块在应用中注册的时候，遍历类模块中的每个函数，然后统一的加上try-catch处理，这样前端里面的所有函数就都在异常处理的范围之内了。怎么样，是不是要比Java等静态语言cool很多？ 代码示例如下