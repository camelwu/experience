## 组件使用和迭代
组件先发布到公司内部，以后采取npm的工作流方式，需要先安装nrm
### nrm
专门用来管理和快速切换私有的registry  
全局安装
```
npm install nrm -g
```
nrm有一些默认配置，用nrm ls命令查看已有的源，带*号即为当前选择的
```
nrm ls
```
也可以直接输入以下命令，查看当前使用的是哪个
```
nrm current
```
用add 命令添加公司私有npm源，http://domain:4873，别名mime
```
nrm add mime http://domain:4873
```
查看nrm配置，发现最mime添加成功通过命令，切换repo
```
nrm use mime
```
执行成功提示
> Registry has been set to: http://domain:4873

还有其它操作命令，请见[npmjs](https://www.npmjs.com/package/nrm)
### 安装私有组件库
接着，添加完了可以进行安装，下面举个例子，我的项目在根目录下project，要安装的库是ly-components，版本是0.7.0。具体版本功能可通过文档进行。
```
cd ~/project && npm i ly-components@0.7.0 && npm run dev
```
“&&”是串行执行，执行完毕可以开始开发；当然，如果大家需要安装其它的库，比如react、lodash之类的，最好是把nrm的源切到npm或cnpm，速度更快些，通过私有库是走代理的，可以测试速度
```
npm test mime
##result:
npm ---- 1547ms
```
安装到本地后，和其它npm包并无不同。
### 私有组件迭代
如果库的功能不能满足你的需求，请按以下方法进行迭代修改，假设你之前没有在本地有过开发库
```
cd ~ && git clone git@gitlab.mime.com/font-end/ly-components && cd ly-components && git pull --all && git checkout -b feature && npm run dev
```
开发完成后，修改注释文档，和package.json，并发布一个版本，假设还是在`mime`的源上
```
npm login
```
输入用户名和密码后，就可以发布
```
npm publish
```
发布后记住自己的版本号假设是0.7.1，回到project项目中，通过update命令升级
```
npm update ly-components@0.7.1 -S
```
完成。
