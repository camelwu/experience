# Jest
Jest 是 Facebook 出品的一个测试框架，相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如自带断言、测试覆盖率工具，实现了开箱即用。而作为一个面向前端的测试框架， Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见框架的自动测试。此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度。目前在 Github 上其 star 数已经29.3K；而除了 Facebook 外，业内其他公司也开始从其它测试框架转向 Jest ，比如 Airbnb ，相信未来 Jest 的发展趋势仍会比较迅猛。

Jest既简单又强大，内置支持以下功能：

+ 灵活的配置：比如，可以用文件名通配符来检测测试文件。

+ 测试的事前步骤(Setup)和事后步骤(Teardown)，同时也包括测试范围。

+ 匹配表达式(Matchers)：能使用期望expect句法来验证不同的内容。

+ 测试异步代码：支持承诺(promise)数据类型和异步等待async / await功能。

+ 模拟函数：可以修改或监查某个函数的行为。

+ 手动模拟：测试代码时可以忽略模块的依存关系。

+ 虚拟计时：帮助控制时间推移。

+ 还有更多的功能，有些我会在下面的部分里更宽泛地谈谈。

## 基本概念

分组（Test Group）：descripe(描述语,function)  
测试用例（Test Case）：test(描述语,function)  
断言（Assert）：expect(运行需测试的方法并返回实际结果).toBe(预期结果)

## 安装
Jest 使用yarn命令，但是npm也可以工作。以 yarn 为例，既可用`yarn add -g jest`进行全局安装；也可以只局部安装、并在 package.json 中指定 test 脚本：
```
{
  "scripts": {
    "test": "jest"
  }
}
```
Jest 的测试脚本名形如`*.test.js`，不论 Jest 是全局运行还是通过`yarn test`运行，它都会执行当前目录下所有的`*.test.js`或`*.spec.js`文件、完成测试。

当然也可以自定义正则匹配的文件格式，后面我们会说到如何配置的问题。
```
# yarn:
yarn add --dev jest
# Or npm:
npm install --save-dev jest
```
> Note: Jest 使用yarn命令，但是npm也可以工作，你可以通过yarn文档对比yarn和npm的不同。

新建一个文件，命名为`sum.js`，代码如下:  
```
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```
接着，再新建一个 sum.test.js文件，代码如下:  
```
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
完成了这两步，把下面的代码添加到项目的 package.json 中:  
```
{
  "scripts": {
    "test": "jest"
  }
}
```
运行`npm run test`命令，可以得到测试的结果信息：
```
PASS  ./sum.test.js
✓ adds 1 + 2 to equal 3 (5ms)
```
## 配置
虽然说Jest是零配置，但也是也提供了配置的方法：
### 配置位置
1. package.json
在package.json添加配置项"jest" : { 配置项 }

2. jest.config.js
新建jest.config.js并添加配置项module.exports = { 配置项 }

3. 命令行（独有的option）
[官网地址](https://jestjs.io/docs/zh-Hans/cli)

### 配置项
1. testMatch
设置识别哪些文件是测试文件（glob形式），与testRegex互斥，不能同时写
```
testMatch: ['\*\*/\_\_tests\_\_/\*\*/\*.js?(x)','\*\*/?(*.)(spec|test).js?(x)']
```
2. testRegex
设置识别哪些文件是测试文件（正则形式），与testMatch互斥，不能同时写
```
testRegex: '(/\_\_tests\_\_).*|(\\\\.|/)(test|spec))\\\\.jsx?$'
```
3. testRnviroment
测试环境，默认值是：jsdom，可修改为node
```
testEnvironment: 'jsdom'
```
4. rootDir
默认值：当前目录，一般是package.json所在的目录。
```
rootDir: ' '
```
5. moduleFileExtensions
测试文件的类型
```
moduleFileExtensions: ['js','json','jsx','node']
```

如下：  
```
module.exports = {
    testMatch: ['<rootDir>/test/\*\*/\*.js'],
    testEnvironment: 'jsdom',
    rootDir: '',
    moduleFileExtensions: ['js','json','jsx','node']
}
```

### Methods
+ afterAll(fn, timeout)
+ afterEach(fn, timeout)
+ beforeAll(fn, timeout)
+ beforeEach(fn, timeout)
+ describe(name, fn)
+ describe.each(table)(name, fn, timeout)
+ describe.only(name, fn)
+ describe.only.each(table)(name, fn)
+ describe.skip(name, fn)
+ describe.skip.each(table)(name, fn)
+ test(name, fn, timeout)
+ test.each(table)(name, fn, timeout)
+ test.only(name, fn, timeout)
+ test.only.each(table)(name, fn)
+ test.skip(name, fn)
+ test.skip.each(table)(name, fn)
+ test.todo(name)

### 基本使用
#### 用例
测试用例是一个测试框架提供的最基本的 API ， Jest 内部使用了 Jasmine 2 来进行测试，故其用例语法与 Jasmine 相同。test()函数来描述一个测试用例，举个简单的例子：
```
// hello.js
module.exports = () => 'Hello world'

// hello.test.js
let hello = require('hello.js')

test('should get "Hello world"', () => {
    expect(hello()).toBe('Hello world') // 测试成功
    // expect(hello()).toBe('Hello') // 测试失败
})
```
其中`toBe('Hello world')`便是一句断言（ Jest 的 “matcher” ）[using-matchers](https://jestjs.io/docs/zh-Hans/using-matchers)。写完了用例，运行在项目目录下执行`npm test`，即可看到测试结果：


#### 用例的预处理或后处理
有时我们想在测试开始之前进行下环境的检查、或者在测试结束之后作一些清理操作，这就需要对用例进行预处理或后处理。对测试文件中所有的用例进行统一的预处理，可以使用 beforeAll() 函数；而如果想在每个用例开始前进行都预处理，则可使用 beforeEach() 函数。至于后处理，也有对应的 afterAll() 和 afterEach() 函数。如果只是想对某几个用例进行同样的预处理或后处理，可以将先将这几个用例归为一组。使用 describe() 函数即可表示一组用例，再将上面提到的四个处理函数置于 describe() 的处理回调内，就实现了对一组用例的预处理或后处理：

```
describe('test testObject', () => {
    beforeAll(() => {
        // 预处理操作
    })

    test('is foo', () => {
       expect(testObject.foo).toBeTruthy()
    })

    test('is not bar', () => {
        expect(testObject.bar).toBeFalsy()
    })

    afterAll(() => {
        // 后处理操作
    })
})
```
测试异步代码异步代码的测试，关键点在于告知测试框架测试何时完成，让其在恰当的时机进行断言。针对几种常见的异步代码形式， Jest 也提供了相应的异步测试语法。首先对于异步回调，向其传入并执行 done 函数， Jest 会等 done 回调执行结束后，结束测试：
```
// asyncHello.js
module.exports = (name, cb) => setTimeout(() => cb(`Hello ${name}`), 1000)

// asyncHello.test.js
let asyncHello = require('asyncHello.js')

test('should get "Hello world"', (done) => {
    asyncHello('world', (result) => {
        expect(result).toBe('Hello world')
        done()
    })
})
```
此外，对于 Promise 控制的异步代码，可以直接在 then 回调中进行断言，只要保证在用例中返回该 Promise 对象即可：
```
// promiseHello.js
module.exports = (name) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Hello ${name}`), 1000)
    })
}

// promiseHello.test.js
let promiseHello = require('promiseHello.js')

it('should get "Hello world"', () => {
    expect.assertions(1); // 确保至少有一个断言被调用，否则测试失败
    return promiseHello('world').then((data) => {
        expect(data).toBe('Hello world')
    })
})
```
Jest 也支持 async/await 语法的测试，无需多余的操作，只要在 await 后进行断言即可，和同步测试的写法一致。测试覆盖率Jest 内置了测试覆盖率工具istanbul，要开启，可以直接在命令中添加 --coverage 参数，或者在 package.json 文件进行更详细的配置。运行 istanbul 除了会再终端展示测试覆盖率情况，还会在项目下生产一个 coverage 目录，内附一个测试覆盖率的报告，让我们可以清晰看到分支的代码的测试情况。比如下面这个例子：
```
// branches.js
module.exports = (name) => {
    if (name === 'Levon') {
        return `Hello Levon`
    } else {
        return `Hello ${name}`
    }
}

// branches.test.js
let branches = require('../branches.js')

describe('Multiple branches test', ()=> {
    test('should get Hello Levon', ()=> {
          expect(branches('Levon')).toBe('Hello Levon')
    });
    // test('should get Hello World', ()=> {
    //       expect(branches('World')).toBe('Hello World')
    // });  
})
```
运行 jest --coverage 可看到产生的报告里展示了代码的覆盖率和未测试的行数：


