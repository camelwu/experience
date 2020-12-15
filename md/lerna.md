# Lerna

通过`webpack`, `rollup`, `babel` 的插件了解到`Monorepo`这个概念。所有机构对于**plugin库**是放在一个仓库里维护还是放在多个仓库里单独维护都有过论证和实践。`Multirepo` 是比较传统的做法，即每一个 `package` 都单独用一个仓库来进行管理。`Monorepo` 是管理项目代码的一个方式，指在一个项目仓库 (repo) 中管理多个模块/包 (package)，不同于常见的每个模块建一个 repo。如下图：
![两种模式对比](../static/l1.jpg)

> Monorepo 的全称是 monolithic repository，即单体式仓库，与之对应的是 Multirepo(multiple repository)，这里的“单”和“多”是指每个仓库中所管理的模块数量。

### Lerna
`Lerna` 是一个管理多个 npm 模块的工具，是 `Babel` 自己用来维护自己的 `Monorepo` 并开源出的一个项目。优化维护多包的工作流，解决多个包互相依赖，且发布需要手动维护多个包的问题。`Lerna` 现在已经被很多著名的项目组织使用，如：`Babel`, `React`, `Vue`, `Angular`, `Ember`, `Meteor`, `Jest` 。

所以，采用[monorepo](https://en.wikipedia.org/wiki/Monorepo) 结构，利用[Lerna](https://github.com/lerna/lerna#readme) 进行依赖项管理。每个 `package` 用`bili`操作`rollup`进行打包，每个包体lib单独有自己的版本号。文档工具采用`typedoc`。有利于项目工程化和技术沉淀共享。

今后需要大家完成的工作有：
1. 每个团队加入自己已经积累的工具库，组件并打好包；
2. 打包可独立可全局，文档生成目前是每个`package`单独有`doc`目录；
3. 发包每次还会全局都提升版本号，每次发包写好changLog并同步邮件到各个团队。

## 参考资料
- [《typeDoc英文文档》](https://typedoc.org/api/)
- [《bili官方英文文档》](https://bili.egoist.sh/)
- [《rollup.js官方中文文档》](https://rollupjs.org/guide/zh)
- [《rollup.js官方英文文档》](https://rollupjs.org/guide/en)
- [《rollup Plugins》](https://github.com/rollup/rollup/wiki/Plugins)
- [《lerna+yarn workspace+monorepo项目的最佳实践》](https://juejin.im/post/5d583231e51d45620541039e)
- [《Lerna.js英文官方文档》](https://github.com/lerna/lerna)