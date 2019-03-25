# 模块化
原本前端技术里是没有这个词，早期没有所谓的前后概念，只有前台和后台。用户和经营者各自看到的，通过后端语言进行权限控制和路由跳转。在Google于2003年提出ajax，随后flash爆出安全问题，被H5取代的过程中，前端承担的交互和视图越来越复杂，代码体量也越来越大。富客户端需要规范，不管从开发还是发版上线，随着文件越来越多，fis（Front-end Integrated Solution）的概念也提出来，当然是借鉴的后端、缓存和软件工程的思想。  

这篇分享只说我个人接触到的模块化思路演进  
  
计算机科学里有两大难题：缓存和命名。最早就是Yahoo提出《命名空间》的概念。举个例子，大家都用过的prototype，jQuery，underscore,lodash等包括后面所有的框架都会有一个特点，对外只暴露一个变量或方法。例如：$ _ 等符号或名字。最早的起源就是Yahoo，向雅虎致敬！！

在命名空间的基础上，业务上仍然需要调用大量的第三方库或轮子，在jQ盛行的年代，插件编写好像就成了面试必问的问题。但这也只是在开发过程中，上线之后呢？页面中src引入无数你可能不需要的js文件，甚至你依赖的文件能否前置加载完毕？这些都是不可知的，大家都知道js的加载也是阻塞性的，在这些情况下开始有了
requirejs和seajs。两者所对应的就是模块化思路的两种：AMD和CMD。而且这两种规范也正是为了推行库的时候所建立的相应标准。一切都是为了在浏览器前端更好的运行和规范。

这两个规范的特点如其名字：

## 三大框架时代
Angular、vue、react目前是前端技术圈子里的主流；angular不是非常熟悉这里就不多谈，公司技术栈已经确认采用react，vue的方式就作为对比稍微提及。  
react的模块化需要结合所面对的业务特点，目前市面上的ant-D已经把UI库做的很方便了；咱们需要考虑的就是如何在这个基础之上进行封装和组合。
12月底的时候我提出一个规范：json传输规范。

### react组件库

React 在组件自由组合方面的天然优势，但是写的不好就会很乱；所以事先约定好代码的规范和数据交互的规则非常重要。  
组件是可以和数据源（一般的组件都会有 data 这个 prop）相耦合的，这样就导致了我们在给某个组件赋值之前，要先写一个数据处理方法，将后端返回回来的数据处理成组件要求的数据结构，再传给组件进行渲染。

这时，如果后端返回的或组件要求的数据结构再变态一些（如数组嵌套），这个数据处理方法就很有可能会写得非常复杂，甚至还会导致许多的 edge case 使得组件在获取某个特定的 attribute 时直接报错。

如何将组件与数据源解耦呢？答案就是不要在组件代码（不论是视图层还是控制层）中出现 data.xxx，而是在回调时将整个对象都抛给调用者供其按需使用。这样组件就可以无缝适配于各种各样的后端接口，大大降低使用者在数据处理时犯错误的可能。

承接前文，其实这样的数据处理方式和前面提到的自由的设计思想是一脉相承的，正是因为我们赋予了使用者自由定制 DOM 结构的能力，所以我们同时也可以赋予他们在数据处理上的自由。

看到这里，支持规范组件的朋友可能已经有些崩溃了，因为听起来自由组件既不定义 DOM 结构，也不处理数据，那么我为什么还要用这个组件呢？

让我们以 Select 组件为例来回答这个问题。

是的，自由的 Select 组件需要使用者自定义下拉元素，还需要在回调中自己处理使用 data 的哪个 attribute 来完成下一步的业务逻辑，但 Select 组件真的什么都没有做吗？其实并不是，Select 组件规范了“选择”这个交互方式，处理了什么时候显示或隐藏下拉列表，响应了下拉列表元素的 hover 和 click 事件，并控制了绝对定位的下拉列表的弹出位置。这些通用的交互逻辑，才是 Select 组件的核心，至于多变的渲染和数据处理逻辑，打包开放出来反而更利于使用者在多变的业务场景下方便地使用 Select 组件。

讲完了组件与数据源之间的解耦，我们再来谈一下组件各个 props 之间解耦的必要性。