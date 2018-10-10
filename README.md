# Front-End知识
前端的基础知识看似很少：html、css、js，实则不然；随着这些年前端技术和大量优秀框架的产生，已经让没太更新知识的人捉襟见肘；包括我自己。借着最近不上班，整理了一些前端的知识，发现要写的东西实在太多。这个blog把我自己的经验结合其他优秀前端分享的知识做一个整理。
从最基础的几个知识开始：
从打开浏览器输入网址，到页面显示出来，拢共分几步？
答：5步（粗略），1、解析DNS；2、与服务器建立http连接；3、服务器处理请求并返回报文；4、浏览器拿到报文数据开始解析；5、浏览器开始进行渲染
第一步：输入域名后对域名进行逐级查找，从运营商到国家级域名服务器再到美国根节点，不管是域名还是IP，都可以返回数据或不返回，所以伟大的墙；
第二步：拿到域名对应服务器的IP地址后进行TCP/IP连接，三次牵手通信，DDoS和DOS攻击就是针对这个过程的特点来进行。
第三步：服务器根据请求类型、URI地址解析并生成html（包头、包体）返回给客户端，早期服务端统一输出的时代SQL脚本注入就是在请求阶段进行的。并且，面试也经常会问到的报文结构；以http1.1为例，举一个最简单的请求例子：
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
我们打开chrome浏览器，在network里，找到第一个html的请求就可以看到最详细完整的内容

第四步：浏览器拿到数据了，
es6 Generator等

模块化，es6的模块化require、exports module.exports异同
请见思维导图

## expericences
优化的一些心得，请移步链接 [优化](https://github.com/camelwu/experience/blob/master/md/optimize.md) 
## 模块化发展

# mv*前端框架
## mvc
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