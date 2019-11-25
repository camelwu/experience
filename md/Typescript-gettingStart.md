# Typescript基础分享


### 什么是Typescript
TypeScript是JavaScript类型的超集，它可以编译成纯JavaScript并且可以在任何浏览器、任何计算机和任何操作系统上运行。


### 对比Javascript的优势
 * 强大的类型系统，并且类型是可选的。类型推断让一些类型的注释使你的代码的静态验证有很大的不同。类型让你定义软件组件之间的接口和洞察现有JavaScript库的行为。
 * TypeScript提供最新的和不断发展的JavaScript特性，包括那些来自2015年的ECMAScript和未来的提案中的特性，比如异步功能和Decorators
 * 强大的工具构建，生态系统繁荣，更适合构建大型应用，并且使代码重构变得简单。
 * 编译时及早的发现错误，而不是在运行时。
 
### 如何使用

 安装TypeScript
 
 1. npm install -g typescript
 + 随便创建一个文件，扩展名为.ts。例如：hello.ts
 + 通过ts内置的编译工具编译代码生成js代码，注意，ts文件无法直接运行在浏览器中。编译命令: tsc hello.ts 




#### 类型注解

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。在hello.ts中我们写下如下代码:

		function sayHi(name:string) {
			return "Hello, " + name;
		}
在sayHi函数中，接受一个参数name, 它的类型为string; 返回值为string类型，这里我们省略了函数的返回值类型。它的函数签名为：a-> a。如果我们在调用时传入不是字符串类型，比如传入一个数字：sayHi(6)，重新编译ts，我们会得到一个错误，类似的，如果尝试删除sayHi中的调用的所有参数，TypeScript会告诉你使用了非期望个数的参数调用了这个函数，两种情况中，TypeScript提供了静态的代码分析，它可以分析代码结构和提供的类型注解。

需要注意的是：尽管有错误，但是hello.js文件还是会生成。 就算你的代码里有错误，你仍然可以使用TypeScript。但在这种情况下，TypeScript会警告你代码可能不会按预期执行。

#### 接口

让我们开发这个示例应用。这里我们使用接口来描述一个拥有firstName和lastName字段的对象。用关键字<font color="blue">interface</font>声明一个接口。
		
		interface Person {
		    firstName: string;
		    lastName: string;
		}

		function sayHi(person: Person) {
		    return "Hello, " + person.firstName + " " + person.lastName;
		}

		let user = { firstName: "Jane", lastName: "User" };
		
		document.body.innerHTML = greeter(user);


#### 类
最后，让我们使用类来改写这个例子。 TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。

让我们创建一个Student类，它带有一个构造函数和一些公共字段。 注意类和接口可以一起共作，程序员可以自行决定抽象的级别。

还要注意的是，在构造函数的参数上使用public等同于创建了同名的成员变量。

	class Student {
		    fullName: string;
		    constructor(public firstName, public middleInitial, public lastName) {
		        this.fullName = firstName + " " + middleInitial + " " + lastName;
		    }
	}

	interface Person {
	    firstName: string;
	    lastName: string;
	}
	
	function sayHi(person : Person) {
	    return "Hello, " + person.firstName + " " + person.lastName;
	}
	
	let user = new Student("Jane", "M.", "User");
	
	document.body.innerHTML = sayHi(user);
	



在Visual Studio里打开hello.ts, 或者把代码复制到TypeScript playground。 将鼠标悬停在标识符上查看它们的类型。 注意在某些情况下它们的类型可以被自动地推断出来。 重新输入一下最后一行代码，看一下自动补全列表和参数列表，它们会根据DOM元素类型而变化。 将光标放在sayHi函数上，点击F12可以跟踪到它的定义。 还有一点，你可以右键点击标识，使用重构功能来重命名。





	
	
	
