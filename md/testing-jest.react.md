React-Typescript 单元测试：Jest + Enzyme
按道理说官配用起来会更舒服才是，结果接连碰壁，加上雷同情况的资料确实有点少，只能填一下。

0. 目前遇到的问题
首先脚手架肯定不是cra（cra用户请直接用官方封装的测试就行），我们肯定会使用自己定制的脚手架。当我们在选用Jest做单测时，出现了几个问题：

typescript
无法读取 webpack
css-modules
第二点简直硬伤，直接导致第三点无从下手。而鄙人又出于“不敢乱动祖传代码”的原则，只能往上面继续填。

1. 装配 Jest
安装
由你喜欢的方式去安装 Jest

npm i -D jest @types/jest #or yarn
复制代码
接着需要配置启动方式

// package.json
{
  ...
  "scripts": {
    "test": "jest",
    ...
  }
  ...
  "jest": {}
}
复制代码
还有一个方法官方并没有提及到（或者我没有注意到）的方法，在你的project放置一个jest.config.js，同样可以配置，对package.json有洁癖的同学适用。

配置
-- 首先我们需要什么？
-- TypeScript！

npm i -D ts-jest #因为我们已经用上了 TypeScript 所以不需要多装一次
复制代码
{
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
    }
  }
}
复制代码
接着，虽然把每个组件的单测放在该组件的文件夹中显得更清晰（cra的做法），但是我们会更愿意把所有测试用例放在test文件夹中。所以建立好test目录，继续加配置

{
  "jest": {
    "moduleFileExtensions": [
      "ts",
      "tsx"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest",
    },
    "testMatch": [
      "<rootDir>/test/**/?(*.)(spec|test).ts?(x)"
    ],
  }
}
复制代码
这样，在类似ydjnb.test.tsx或者ydjnb.spec.ts等等等等的文件才会被捕获为测试文件进行测试。

// ydjnb.spec.ts

test('Jest-TypeScript 尝试运行', () => {
  expect(1+1).toBe(2) // Pass
})
复制代码
至此，你可以使用对Typescript的测试，但对于React来说还差一点。

2. 装配 Enzyme
这里我们就直接选用Enzyme了，在Jest文档，关于Testing React Apps -- DOM Testing中，也提到是建议使用Enzyme。

npm i -D enzyme @types/enzyme
复制代码
回到ydjnb.spec.ts中，现在因为涉及到JSX所以应该改名为*.tsx了

// ydjnb.spec.tsx
import { shallow } from 'enzyme'

test('Jest-React-TypeScript 尝试运行', () => {
  const renderer = shallow(<div>hello world</div>)
  expect(renderer.text()).toEqual('hello world')
})
复制代码
当然shallow只是一种“浅渲染”，它只会对当前组件渲染，做断言。一般测试除了关心数据还会关心交互，所以还会有另外两个方法render, mount。

3. 问题解决
-- 配完了！运行一下吧！
-- ERROR

其实细心一点就会发现，我上面的代码段并没有标记// Pass，而且现在你可能还回头看了！

enzyme-adapter-react-16
所以第一个错误还是很好解决的，因为你仔细看一下测试结果，Enzyme已经告诉你了。

Enzyme Internal Error: Enzyme expects an adapter to be configured, but found none. To configure an adapter, you should call Enzyme.configure({ adapter: new Adapter() })before using any of Enzyme's top level APIs, where Adapter is the adaptercorresponding to the library currently being tested. For example:

import Adapter from 'enzyme-adapter-react-15';

To find out more about this, see http://airbnb.io/enzyme/docs/installation/index.html

不过我知道我用的已经是react-16了，跟着文档也会提到关于react-16的解决方法。

npm i -D enzyme-adapter-react-16
复制代码
回到ydjnb.spec.tsx中，

// ydjnb.spec.tsx
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('Jest-React-TypeScript 尝试运行', () => {
  const renderer = shallow(<div>hello world</div>)
  expect(renderer.text()).toEqual('hello world') // Pass
})
复制代码
css-modules
根据Jest的文档，加上一个库解决问题：identity-obj-proxy

{
  "moduleNameMapper": {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  "transform": {
    ...
  },
  ...
}
复制代码
至此，需求已经能完全运作。