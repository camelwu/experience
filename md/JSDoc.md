今后创建类js文件，请大家都写上注释。后续我将使用工具生成html或markdown文件

### 添加代码文档
参照如下规则，直接在代码中编写文档。
```
/**
* HelloWorld类存储一位客人的名字，并打招呼。
*/
class HelloWorld extend React.Component {
 
constructor(){
this.firstName = '';
this.lastName = '';
}
 
/**
* 设置客人的姓名
*
* @param {String} lastName 姓
* @param {String} firstName 名
*/
setName(lastName, firstName){
this.lastName = lastName;
this.firstName = firstName;
}
 
/**
* 获取客人的全名
*
* @return {String} 客人的姓名
*/
getFullName(){
return this.lastName + ' ' + this.firstName;
}
 
/**
* 向客人打招呼
*
*/
sayHello(){
console.log('Hello, ' + this.getFullName());
}
}
``` 

### 使用jsDoc生成文档
现在我们可以为JokeMachine类生成文档。
```
npm install jsdoc && jsdoc helloworld.js
```
就可以看到相对应的index.html