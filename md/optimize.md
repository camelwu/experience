## 加载和执行
浏览器是友善的客户端，对同域名并发请求是有数量限制，过去浏览器一般是2个，支持H5的一般是6个；并且服务器端是可以关闭请求。 有朋友不理解，为什么不是并发越多越好？举个例子：百万级的PV，并发数量过大会造成什么样的后果？ 由此而延伸出来的的资源加载优化就可以有两个方向
1. 开源
增加域名 既然同域名不能太多，那么就多域名；简单来说就是cdn，可以是第三方，也可以自己多弄几个二级域名
2. 节流
资源压缩、按需加载 同域名内的文件充分的进行压缩，比如：本来2M的资源，如果压缩到1M以下（去除空格，gzip等）速度的提升就是50%；再有现在spa是将文件合并后进行压缩和打包，如果文件总体并不大，性能不会有太大影响；一旦开发中引入的UI库或第三方插件多了，总文件体量也不在少数；就有了：按需加载、延时加载的用武之地。

### 阻塞性优化
 js文件加载后是否要立即执行？立即执行是否会影响页面渲染？过去浏览器在加载和执行js文件时是阻塞状态，就是按照栈原理一个个来；所以，原来要求把js文件放到html代码底部</body>前，现代浏览器某种程度上解决了并行加载的问题，也可以进行预加载，但是执行之后会否对页面造成重排？所以要灵活应用dns-prefetch、preload和defer|async，当然defer和async不是所有浏览器都生效，webkit核心的就没生效。

```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Demo</title>
<link rel="dns-prefetch" href="//cdn.com/">
<link rel="preload" href="//js.cdn.com/currentPage-part1.js" as="script">
<link rel="preload" href="//js.cdn.com/currentPage-part2.js" as="script">
<link rel="preload" href="//js.cdn.com/currentPage-part3.js" as="script">
<link rel="prefetch" href="//js.cdn.com/prefetch.js">
</head> 
<body>
<!-- html code -->

<script type="text/javascript" src="//js.cdn.com/currentPage-part1.js" defer></script>
<script type="text/javascript" src="//js.cdn.com/currentPage-part2.js" defer></script>
<script type="text/javascript" src="//js.cdn.com/currentPage-part3.js" defer></script>
</body>
</html>
```
### js执行优化

1. 作用域优化，变量层级不要太深或嵌套太多，最好是本级；大家在看各大框架或库的时候，经常可以看到这种写法：
```
(function(w,d){})(window,document)
```
目的就是如此，再比如说的缓存某个变量或对象
```
function check(){
  var d = document, t = document.getElementById('t'), l = t.children;
  for(let i=0;i<l;i++){
    //code
  }
}
```
2. 循环优化
循环是编程中最常见的结构，优化循环是性能优化过程中很重要的一部分。一个循环的基本优化步骤如下：
 
减值迭代——大多数循环使用一个从0开始，增加到某个特定值的迭代器。在很多情况下，从最大值开始，在循环中不断减值的迭代器更加有效。
简化终止条件——由于每次循环过程都会计算终止条件，故必须保证它尽可能快，即避免属性查找或其它O(n)的操作。
简化循环体——循环体是执行最多的，故要确保其被最大限度地优化。确保没有某些可以被很容易移出循环的密集计算。
使用后测试循环——最常用的for和while循环都是前测试循环，而如do-while循环可以避免最初终止条件的计算，因些计算更快。
for(var i = 0; i < values.length; i++) {
    process(values[i]);
}
优化1：简化终止条件
 
for(var i = 0, len = values.length; i < len; i++) {
    process(values[i]);
}
优化2：使用后测试循环（注意：使用后测试循环需要确保要处理的值至少有一个）
 
var i values.length - 1;
if(i > -1) {
    do {
        process(values[i]);
    }while(--i >= 0);
}
3. 展开循环
 
当循环的次数确定时，消除循环并使用多次函数调用往往更快
当循环的次数不确定时，可以使用Duff装置来优化。Duff装置的基本概念是通过计算迭代的次数是否为8的倍数将一个循环展开为一系列语句。如下：
// Jeff Greenberg for JS implementation of Duff's Device
// 假设：values.length > 0
function process(v) {
    alert(v);
}
 
var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
var iterations = Math.ceil(values.length / 8);
var startAt = values.length % 8;
var i = 0;
 
do {
    switch(startAt) {
        case 0 : process(values[i++]);
        case 7 : process(values[i++]);
        case 6 : process(values[i++]);
        case 5 : process(values[i++]);
        case 4 : process(values[i++]);
        case 3 : process(values[i++]);
        case 2 : process(values[i++]);
        case 1 : process(values[i++]);
    }
    startAt = 0;
}while(--iterations > 0);
如上展开循环可以提升大数据集的处理速度。接下来给出更快的Duff装置技术，将do-while循环分成2个单独的循环。（注：这种方法几乎比原始的Duff装置实现快上40%。）
 
// Speed Up Your Site(New Riders, 2003)
function process(v) {
    alert(v);
}
 
var values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
var iterations = Math.floor(values.length / 8);
var leftover = values.length % 8;
var i = 0;
 
if(leftover > 0) {
    do {
        process(values[i++]);
    }while(--leftover > 0);
}
 
do {
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
    process(values[i++]);
}while(--iterations > 0);
针对大数据集使用展开循环可以节省很多时间，但对于小数据集，额外的开销则可能得不偿失。

4. 避免双重解释
 
当JS代码想解析JS代码时就会存在双重解释惩罚，当使用eval()函数或是Function构造函数以及使用setTimeout()传一个字符串时都会发生这种情况。如下
 
eval("alert('hello world');"); // 避免
var sayHi = new Function("alert('hello world');"); // 避免
setTimeout("alert('hello world');", 100);// 避免
以上代码是包含在字符串中的，即在JS代码运行的同时必须新启运一个解析器来解析新的代码。实例化一个新的解析器有不容忽视的开销，故这种代码要比直接解析要慢。以下这几个例子，除了极少情况下eval是必须的，应尽量避免使用上述。对于Function构造函数，直接写成一般的函数即可。对于setTimeout可以传入函数作为第一个参数。如下：
 
alert('hello world');
var sayHi = function() {
    alert('hello world');
};
setTimeout(function() {
    alert('hello world');
}, 100);
总之，若要提高代码性能，尽可能避免出现需要按照JS解释的代码。
 
5. 性能的其它注意事项
原生方法更快——只要有可能，使用原生方法而不是自已用JS重写。原生方法是用诸如C/C++之类的编译型语言写出来的，要比JS的快多了。
switch语句较快——若有一系列复杂的if-else语句，可以转换成单个switch语句则可以得到更快的代码，还可以通过将case语句按照最可能的到最不可能的顺序进行组织，来进一步优化。
位运算较快——当进行数学运算时，位运算操作要比任何布尔运算或算数运算快。选择性地用位运算替换算数运算可以极大提升复杂计算的性能，诸如取模，逻辑与和逻辑或也可以考虑用位运算来替换。

6. 最小化语句数
JS代码中的语句数量也会影响所执行的操作的速度，完成多个操作的单个语句要比完成单个操作的多个语句块快。故要找出可以组合在一起的语句，以减来整体的执行时间。这里列举几种模式

1.多个变量声明
 
// 避免
var i = 1;
var j = "hello";
var arr = [1,2,3];
var now = new Date();
 
// 提倡
var i = 1,
    j = "hello",
    arr = [1,2,3],
    now = new Date();
2.插入迭代值
 
// 避免
var name = values[i];
i++;
 
// 提倡
var name = values[i++];
3.使用数组和对象字面量，避免使用构造函数Array(),Object()
 
// 避免 
var a = new Array();
a[0] = 1;
a[1] = "hello";
a[2] = 45;
 
var o = new Obejct();
o.name = "bill";
o.age = 13;
 
// 提倡
var a = [1, "hello", 45];
var o = {
    name : "bill",
    age : 13
};
4.优化DOM交互
在JS中，DOM无疑是最慢的一部分，DOM操作和交互要消耗大量时间，因为它们往往需要重新渲染整个页面或者某一个部分，故理解如何优化与DOM的交互可以极大提高脚本完成的速度。后面会针对性说明

## 数组存储
计算机科学中有个经典问题：通过改变数据存储的位置来获得最佳的读写性能，数据存储的位置关系到代码执行过程中数据的检索速度。在JS中这个问题相对简单，因为只有4种方案。
+ 字面量
  字面量就代表自身，不存储在特定位置。JS字面量有：字符串、数字、布尔、对象、数组、函数、正则表达式和特殊的null、undefined
+ 本地变量
  使用var定义的数据存储单元
+ 数组元素
  存储在JS对象内部，以数字作为索引
+ 对象成员
  存储在JS对象内部，以字符串作为索引
每一种数据存储的位置都有不同的读写消耗。大多情况下差不多，数组和对象代价稍高一些，具体表现看浏览器的性能和js解释器。尽量使用字面量和局部变量，减少数组项和对象成员的使用。

### 作用域
理解作用域概念是JS和核心关键，不仅从性能还得从功能的角度。简单说：生效的范围（域），哪些变量可以被函数访问，this的赋值，上下文（context）的转换。说到作用域就不能绕开作用域链。理解了作用域链和标识符就理解了作用域。
### 作用域链和标识符解析
每个函数都是Function对象的实例，Function对象和其它对象一样，拥有可以编程访问的属性，和一系列不能通过代码访问而仅供JS引擎存取的内部属性。其中一个内部属性是[[Scope]]，有ECMA-262标准第三版（http://www.ecma-internarionl.org/publications/standards/Ecma-262.htm）定义

内部属性[[Scope]]包含了一个函数被创建的作用域中对象的集合。这个集合被称为函数的作用域链，它决定那些数据能被函数访问，函数作用域中的每个对象被称为一个可变对象，每个可变对象都以“键值对”的形式存在。当一个函数创建后，他的作用域链会被创建此函数的作用域中可访问的数据对象所填充。例如：
```
function fn(a,b){
    return res = a*b;
}
```
当fn创建时，它的作用域链中插入了一个对象变量，这个全局对象代表着所有在全局范围内定义的变量。该全局对象包含window、navigator、document等。fn执行的时候就会用到作用域，并创建执行环境也叫执行上下文。它定义了一个函数执行时的环境，即便是同一个函数，每次执行都创建新的环境，函数执行完毕，环境就销毁。
每个环境都要根据作用域和作用域链解析参数、变量。可以理解为作用域链好比一个堆栈，栈顶就是当前的活动对象（环境创建时函数[[Scope]]属性中的对象集合）大多情况也可以理解为函数内部定义的局部变量。

而闭包的是根据JS允许函数访问局部作用域之外的数据，虽然会带来性能问题，因为执行环境虽然销毁，但激活的对象依然存在，所以可以缓存变量，从而不用全局对象。适用

### 对象
属性和方法，两者都是对象的成员，引用了函数就是方法，非函数就是属性。为什么对象访问慢呢？因为原型链问题。
### 原型和原型链
直接看代码
```
function fun(name,age){
    this.name = name+'';
    this.age = age
}
fun.prototype.getName = function(){
    return this.name;
}
var fn = new fun(); 

true = (fn instanceof fun) //true
true = (fn instanceof Object) 

fn.__proto__ = fun.prototype

/*
 * fun的原型方法

__proto__ = null
hasOwnProperty = (function)
isPrototypeOf = (function)
propertyIsEnumerable = (function)
toLocaleString = (function)
toString = (function)
valueOf = (function)
*/
```
平时普通变量也是这样一级级向上直到根（window）下，没有此变量或属性或方法，才返回undefined；
## DOM编程
DOM操作代价高昂，这是web application最常见的性能瓶颈，Document Oject Module(DOM)是独立于语言的，用于操作xml和html文档的的程序接口，而且在浏览器中是通过js实现的。
各个公司的浏览器渲染和js解释引擎都不同，著名的V8相信大家都知道，是一个js引擎；但Chrome的渲染是WebCore。每个浏览器都有两套解释器，并相对独立。这就意味着每次操作都需要(V8<=>WebCore)==>Browser 两个解释器都是需要连接和通讯成本。减少两解释器通讯并减少页面改变的频率就是优化的方向。

### 重绘repaint和重排reflow
DOM树里的每个需要显示的节点在渲染树中至少存在一个对应的节点，隐藏的（display:none）的DOM元素则没有；渲染树的节点被称为帧(frames) 盒(boxes)，DOM和渲染树构建完毕，浏览器就开始绘制页面元素（paint）

何时发生重重绘？当页面的几何属性发生变化，影响到现有的文档流需要重新调整页面排版的时候。举几个例子：
+ 添加或删除可见的DOM元素；
+ DOM元素位置改变；
+ DOM元素尺寸改变：容器padding、border、margin属性变化等；
+ 容器内的内容变化导致宽高变化：文本行数变多（少）、图片坍塌、图片被另一张大图替换
+ 浏览器窗口初始化和尺寸改变
重排结束后，就需要重绘。所以，尽可能的避免重排的产生，为了避免或少的进行重绘和重排，需要尽可能少的访问某些变量：
```
offsetTop、offsetLeft、offsetWidth、offsetHeight
scrollTop、scrollLeft、scrollWidth、scrollHeight
clientTop、clientLeft、clientWidth、clientHeight
getComputedStyle() (currentStyle in IE)
```                      
                                                 ```
function scroller(){
    var H = document.body.offsetHeight || scrollHeight
    return function(){
        var args = arguments,ct = this;
        // your code
    }
}
```
为了最小和最少的影响到重绘和重排，应该尽可能少的修改DOM，访问影响重排的属性。如果非要修改，尽量尊从三个步骤：
1.元素脱离文档流
2.一次性应用多重改变
3.恢复到文档流中
第一和第三步都会发生重排，所以核心的还是第二步。现在虚拟dom大🔥，我们稍微了解下基础做法即可。
一次性更新的几种方式：字符串或数组.join('') innerHTML方式，createElement最后appendChild，document.createDocumentFragment,cloneNode需要改变的节点到缓存节点中，改完替换。
再者，动画时也需要尽可能少重绘和重排，例如：沿对角线，从左上移动到右下角
```
function move2RB(){
    var dom = document.getElementById('id'),curent = dom.style.top;
    while(curent<500){
        curent++
        dom.style.cssText = 'left:'+curent+'px; top:'+curent+'px';
    }
}
// 不要写成每次都去获取，left=dom.style.left再加1，甚至是dom.style.left = (pareSint（dom.style.left,10)+1)+'px'这种写法，直接改变className也是可以的。
```
总结起来就几句话：少访问DOM，在js里处理计算完了再一次性修改，善用缓存和原生API；用现在的三大框架（angular、react、vue）即可不用操心这些 ：）

## 算法和流程控制
代码的整体结构是影响运行速度的主要因素之一，数量与运行速度不一定成正比。组织结构、思路和执行效率才是核心！！
JS属于ECMA的范畴，是一种脚本类语言，很多流程上的控制，工程化的思路是从java、c等语言上借鉴过来的，所以，知道后端语言的编码和工程化有助于我们加深理解。

### Loop循环
1. for
```
for(var i=0;i<10;i++){
    // code
}
```
倒序可以在大数据量时提高少许效率，i<obj.length;i--
2. while
前置循环
```
var i=0;
while(i<10){
    // code
    i++;
}
```
后置循环
```
var i=0;
do{
    // code
}while(i++<10)
```
3. for - in
```
for(var prop in object){
    // code
}
```
除了for-in循环其它效率所差不多，那么能够提高效率的点也就两个
- 每次迭代处理的事务
- 迭代的次数
一般数组array遍历写法的循环中，每次都会有如下操作：
1.在控制条件中查找一次属性array.length
2.在控制条件中执行一次数值比较i<array.length
3.比较循环条件是否满足，i<array.length === true
4.一次自增或自减操作i++||i--
5.数组、对象查找 array[i]
6.具体事务处理
将length提前获取并存到变量中可以减少两步（1和2），当循环复杂度为O(n)时，减少每次迭代的工作量是最有效的，当复杂度大于O(n)，需要着重减少迭代次数。
达夫设备（Duff`s Device）
var items = Array(1000),iterations = Math.floor(items.length/8),startAt = items.length%8,i=0;
do {
    switch(startAt){
        case 0:process(items[i++]);
        case 7:process(items[i++]);
        case 6:process(items[i++]);
        case 5:process(items[i++]);
        case 4:process(items[i++]);
        case 3:process(items[i++]);
        case 2:process(items[i++]);
        case 1:process(items[i++]);
    }
    startAt = 0;
}while(--iterations)
## 字符串和正则

## 快速响应的页面
### 浏览器线程

### event loop浅见

### Web Workers
从JS诞生以来，一直都是单线程工作，只能在浏览器UI线程里运行。从Google的Gears插件提出了Worker Pool API，它就是Web Workers的“原型”，最初希望能够增强浏览器的功能，比如支持离线浏览（离线访问缓存页面，重新上线后提交离线操作），但（2015/11）已经被弃用了。HTML5开始Web Workers API被分离出去，成立单独的规范。自此，我们可以将计算、编解码、真正的异步请求等放到Web Workers里.
+ 运行环境
worker的global context并不是window，而是self，self也提供一系列接口，包括self.JSON、self.Math、self.console等等，最直观的区别是document对象没了，但location（readonly）、navigator还在；所以DOM访问也不存在。要启用它只能在创建一个独立的js文件并通过下面的方式调用
html中直接写
```
var worker = new Worker('worker.js')
```
或通过主页面的js文件调用，例如：
main.js
```
//---主页面
if (window.Worker) {
    var worker = new Worker('worker.js');
    var data = {a: 1, b: [1, 2, 3], c: 'string'};
    worker.postMessage(data);
    worker.onmessage = function(e) {
        console.log('main thread received data');
        console.log(e.data);

        // 接到消息立即停止worker，onerror将不会触发
        // worker.terminate();
        // terminate之后收不到后续消息，但post不报错
        // worker.postMessage(1);
    }
    worker.onerror = function(err) {
        console.log('main thread received err');
        console.log(err.message);
        // 阻止报错
        err.preventDefault();
    }
}
```
worker.js
```
//---处理js,可以引入其它依赖
// importScripts('lib.js');
// importScripts('a.js', 'b.js');
onmessage = function(e) {
    console.log(self); // 看看global变量身上有些什么
    var data = e.data;
    console.log('worker received data');
    console.log(data);

    var res = data;
    res.resolved = true;

    postMessage(res);

    setTimeout(function() {
        throw new Error('error occurs');

        // close，立即停止，相当于主线程中的worker.terminate()
        // close();
    }, 100);
};
```
+ 通信
主线程和worker线程收发消息方式一致（postMessage发，onmessage/onerror收，数据从MessageEvent的data属性取），PS：线程之间传递的是值copy，而不是共享引用
+ 加载外部文件
importScripts可以引入其它js文件，外部文件中的全局变量将被粘在self上，worker里可以直接引用。importScripts是同步的，下载并执行完毕后执行下一行，所以，需要注意阻塞性问题。
应用范围：
+ 音频/视频解码
如果尝试过audioContext.decodeAudioData之类的操作就会发现，我们迫切需要一个能“干重活”的后台线程
+ 图片预处理
比如头像上传前的裁剪，甚至添加水印、拼合、添马赛克，如果在客户端能够完成，就能避免大量的临时文件传输
+ 排序等数据处理算法
减轻服务器压力，遇到超大数据或超过200ms不能处理完毕的方法
数据过大的JSON对象，超出允许时间
```
//---main
var worker = new Worker('worker.js')
worker.onmessage = (e)=>{
    var jsonData = e.data // 回传回来的数据
    evaluateData(jsonData)
}
worker.postmessage(jsonText)
///---worker
self.onmessage = (e){
    var jsonText = e.data // main传过来的数据
    var jsonData = JSON.parse(jsonText) // 解析转换
    self.postMessage(jsonData)
}
```
+ 客户端模版
比如markdown，或者服务端返回JSON，客户端拿到后交给后台线程解析并应用模版HTML生成页面，这些操作都由客户端完成的话，需要传输的东西就更少了
+ 共享worker
必须是同源！必须是同源！必须是同源！
```
//---main
var sWorker = new SharedWorker('worker.js')
sWorker.port.start()
//---first
first.onchange = function() {
  sWorker.port.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}
//---first
second.onchange = function() {
  sWorker.port.postMessage([first.value,second.value]);
  console.log('Message posted to worker');
}

sWorker.port.onmessage = function(e) {
  result1.textContent = e.data;
  console.log('Message received from worker');
}
```
## 编程实践
### 栗子

### 使用Object、Array直接量

### 避免重复执行

### 使用速度快的api

## 工具Tools

### YUI
### Firebug
### IE
### Safari
### Chrome

### page speed
###  Fiddler
###  YSlow
###  dynaTrace

