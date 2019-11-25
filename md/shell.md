# webapp-express
为了让QA方便在本地进行测试，把所有webApp综合在本地测试的express版本，结合了部署和传输的功能。  
对应项目和部署的目录：  
```
webapp-chat=>chat
webapp-discover=>discover
webapp-home=>home
webapp-invest=>invest
webapp-manage=>manage
webapp-onboarding=>user

```
每一个webapp项目中都有`npm run deploy:qa`功能，方便本地环境的更新和测试跟进。

如果有正式的测试、预生产、生产环境需要不同的方式，部署方案需要改进。
## useage
本地运行
```
git clone git@github.com:zillyinc/webapp-express.git && cd webapp-express &&
npm install && npm run dev
```
webapp-sandbox服务器，已经配置好了ssh和目录，在`/home/ubuntu/web/webapp-express`里运行  
```
git pull
```
就可以拉取最新发布的代码，传输到nginx目录中，命令如下：  
```
# sudo first
npm run deploy
```

## 技术说明
`express`做为基础http服务，所有的文件作为静态资源放到`/public`目录，通过中间件`connect-history-api-fallback`获取H5的history路由，入口如下：  
index.js
```
app.use(history({
  rewrites: [{
      from: /\/user\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/sign-in\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/sign-up\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/reset-password\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/link-sent\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/select-role\/{0,}$/,
      to: 'user/index.html'
    },
    {
      from: /\/chat\/{0,}$/,
      to: 'chat/index.html'
    },
    {
      from: /\/discover\/{0,}$/,
      to: 'discover/index.html'
    },
    {
      from: /\/home\/{0,}$/,
      to: 'home/index.html'
    },
    {
      from: /\/manage\/{0,}$/,
      to: 'manage/index.html'
    }
  ]
}));
```
除此之外，并无其它需要特殊说明的。

如果有问题随时联系我

paul.wu@zilly.com.cn
