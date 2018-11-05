## apply,bind&call
在js中，apply,bind,call是Function对象自带的三个方法，这三个方法的主要作用是改变函数执行的上下文（context），也可单纯记住改变了this对象。  
那么三者有什么异同？  
apply,bind,call 三者都是用来改变函数的this对象的指向的；
apply,bind,call 三者第一个参数都是this要指向的对象，也就是想指定的上下文（函数的每次调用都会拥有一个特殊值——本次调用的上下文（context）——这就是this关键字的值。
apply,bind,call 三者都可以利用后续参数传参；
bind是返回对应函数，等待调用；apply,call则是立即调用
### apply, call
直接看代码  
```
// 求数组中的最大值，可以看到a,c就是参数不同而已，bind用于定义，等待调用
var arr = [1,3,4,34,7,90]
var max = Math.max.call(this, ...arr)
var maX = Math.max.apply(this, arr)
// 
var Max = function(arr){
    return 
}
```
第一个参数可以不传，null,undefined,this(gobal||window)等。通过实操可以看到context的转变
```
function a(){
    console.log(this)
}
function b(){}
var c = {a:'hello world!'}
// 各位观众，请看结果
a.call();   //window
a.call(null);   //window
a.call(undefined);   //window
a.call(1);   //Number
a.call('');   //String
a.call(true);   //Boolean
a.call(b);   //function b(){}
a.call(c);   //Object
```
那么我们可以利用这种特性进行继承和调用，调用刚刚看过了。那么继承怎么实现呢？
```
function A(){
    let arg = arguments
    this.name = 'a'
    // this.age = arg[0]
    this.getName = function(){
        return this.name
    }
}

function B(){
    this.name = 'b'
}

var a = new A()
var b = new B()

a.getName.call(b)    //b
// b中并没有getName方法，为什么说可以用来继承？再来一个容易看懂的
function C(name){
    A.call(this, name)
}
var c = new C('johns')
console.log(c.getName())    //johns
```
A.call(this) 使用 A对象代替C里this对象，那么C
就能直接调用A的所有属性和方法。如果使用apply方式，注意后面的参数得是个数组。  
问题来了：既然就是参数不同，何必费劲提供两种api？jser自己做个转换不好吗？请大家动动脑经好好思考。
### bind 
MDN的解释是：bind()方法会创建一个新函数，称为绑定函数，当调用这个绑定函数时，绑定函数会以创建它时传入 bind()方法的第一个参数作为 this，传入 bind() 方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。  

注意：IE9以下不支持！IE9以下不支持！IE9以下不支持！bind方法的返回值是函数！！！  
```
var a=function(){   
  console.log(this.c);   
}
var b={ 
     c:3   
}   
a();  
a.bind(b)();
/*
 * 或
 */
var func=a.bind(b);   
func();

输出：
undefined
3
```