# Next.js

Next.js是一个用于React应用的极简的服务端渲染框架。起步和配置都可以在[next/learn](https://nextjs.org/learn/basics/create-nextjs-app) 看到相关的文档。这里写一点自己看文档撸代码的步骤和心得

## 起步
安装方法:
```javascript
npm install --save next react react-dom
// or
npm install create-next-app -g && npm init next-app nextjs-blog --example "https://github.com/zeit/next-learn-starter/tree/master/learn-starter" // example 是案例的源码地址，可以根据自己的需求到 https://github.com/zeit/next-learn-starter 去找
```
如果是第一种自定义的方式，需要在`package.json`里添加`scripts`。
```json
"scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
}
```
如果采用脚手架，生成的目录结构如下：
```
.
├── .next
├── components # 公用组件
├── next.config.js # Next.js 应用配置
├── node_modules
├── package.json
├── pages # 页面
├── public # 静态资源
├── README.md
├── server.js # 自定义 Next.js server
└── styles # 样式表
```
1. 所有的静态资源或公用css文件，统一存放到`public`目录即可。组件样式可以`css-in-js`，也可以直接新建css文件然后 `import from '[path]/[name].css'`。
2. 所有的页面在`pages`目录里直接新建对应的js|jsx文件即可，首页就是`pages/index.js`, 其他的类似`/pages/[path]/index.js`或`/pages/[path].js`。
3. 所有的组件都可以存放到`components`目录下，比如title、toper、footer、layout 之类的
4. 有需要添加自己编写的库，根目录下新建目录utils或lib都可以。
5. redux或mobx的存放可以按其他react项目的结构和命名方式

## 开发
### 自定义document，app


## 问题

1. isomorphic-fetch（解决）

fetch 本来不是什么问题，但是涉及到请求签名，就来了点麻烦，需要区分是服务端还是客户端，客户端用 cookie 存储 token，服务端用变量。

2. node 端代码打包（未解决）

node 代码其实不需要打包，因为是运行在服务端，不过为了节省 docker 镜像的大小，尝试了打包，主要是想把 node_modules 也打包进去。先是用 webpack，能打包成功，但是运行失败。后面又用 rollup，同样是打包成功，运行失败。可能是因为 nextjs 本身就包含了 webpack，而用打包工具来打包自己，估计 webpack 和 rollup 都没有想过会有这样的场景出现。于是放弃。

3. js 放到 cdn 或者 oss（解决）

这个比较坑，所以重点说一下。

nextjs 提供了 assetPrefix 参数，但是这个参数基本没什么用。需要解决两个问题，一是打包目录要把 hash 带进去，把原来的 bundles/pages/xxx.js 目录结构改成 [hash]/xxx.js，这一步可以在打包脚本里处理，通过 BUILD_ID 和 build-stats.json 拿到 hash，直接上代码：
```sh
rm -r -f build
mkdir build

# move pages
buildId=$(cat _next/BUILD_ID)
mkdir build/${buildId}
mv _next/bundles/pages/* build/${buildId}
rm -r _next/bundles

# move app.js
appHash=$(cat _next/build-stats.json)
appHash=${appHash#*hash\":\"}
appHash=${appHash%\"*}
mv _next/app.js build/app.${appHash}.js
```
_next 是 nextjs 的 distDir，build 是需要上传到 cdn 的目录。


接下来在 server.js 里重写 router，用了 express，参考 https://github.com/zeit/next.js/issues/257

```js
const cdnPrefix = 'https://mycdn.com'

server.use('/_next/**/app.js', (req, res) => {
  const appHash = req.originalUrl.replace('/_next/', '').replace('/app.js', '')
  const newUrl = `${cdnPrefix}/build/app.${appHash}.js`
  res.redirect(newUrl)
})

server.use('/_next/**/page/**', (req, res) => {
  const buildHash = req.originalUrl.replace('/_next/', '').replace(/\/page\/.*/, '')
  const pageName = req.originalUrl.replace(/.*page\//, '') || 'index'
  const newUrl = `${cdnPrefix}/build/${buildHash}/${pageName}.js`
  res.redirect(newUrl)
})
```

4. static 目录下的图片 hash（临时方案）

static 目录下的图片 hash，这个问题也比较次要，暂时可以通过 githooks 来处理图片修改的问题，对于图片只允许增量提交。

.git/hooks/pre-commit
```sh
#!/bin/sh
STAGED_IMAGES=$(git diff --cached --name-only --diff-filter=M | grep -E ".(jpg|jpeg|png|gif)$")

if [[ $STAGED_IMAGES ]];
then
  echo $STAGED_IMAGES
  exit 1
fi
```

比如 process.env.NODE_ENV 的问题（如果有三种以上的环境），比如 scss 里面因不同环境插入不同 cdn 地址图片的问题，等等，就不列了。