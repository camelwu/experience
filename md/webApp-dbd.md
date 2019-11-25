# WebApp debug & build & deploy
目录结构
```
.
├── README.md
├── config
│   ├── env.js
│   ├── jest
│   ├── loaders.js
│   ├── paths.js                        // 修改public路径，代替过去’/‘=>'xx'
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js          // 还原默认设置
│   └── webpackDevServer.config.js
├── config-overrides.tsx
├── images.d.ts
├── node_modules/
├── package-lock.json
├── package.json
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── checkPkVersion.js
│   ├── custom.js
│   ├── shell.js
│   ├── start.js
│   └── test.js
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── api
│   ├── common.tsx
│   ├── componment
│   ├── container
│   ├── global.tsx
│   ├── index.tsx
│   ├── logo.svg
│   ├── pages
│   ├── redux
│   ├── registerServiceWorker.ts
│   ├── router
│   ├── source
│   ├── types
│   └── util
├── tsconfig.json
├── tsconfig.prod.json
├── tsconfig.test.json
└── yarn.lock
```

/package.json
```
{
    "name": "zilly_webapp",
    "version": "0.1.0",
    "private": true,
+   "pathname": "discover",
    "dependencies": {
        ……
    },
    "scripts": {
+		    "start:sandbox": "NODE_ENV=sandbox node scripts/start.js",
+		    "staging": "NODE_ENV=staging node scripts/start.js",
+		    "start": "NODE_ENV=sandbox node scripts/start.js",
+		    "build:dev": "NODE_ENV=development node scripts/custom.js",
+		    "build:sandbox": "NODE_ENV=sandbox node scripts/custom.js",
+		    "build:staging": "NODE_ENV=staging node scripts/custom.js",
        "build": "node scripts/build.js",
        "test": "node scripts/test.js --env=jsdom",
        "lint": "eslint --fix --ext .ts,.tsx src",
+		    "deploy:qa": "NODE_ENV=sandbox node scripts/shell.js",
+   		"deploy:prod": "NODE_ENV=production node scripts/shell.js",
		    "prestart": "node scripts/checkPkVersion.js"
    },
    ……
}
```

/config/paths.js  
```
'use strict';

const path = require('path');
const fs = require('fs');
const url = require('url');

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash (path, needsSlash) {
    const hasSlash = path.endsWith('/');
    if (hasSlash && !needsSlash) {
        return path.substr(path, path.length - 1);
    } else if (!hasSlash && needsSlash) {
        return `${path}/`;
    } else {
        return path;
    }
}

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage;
+const getPathName = appPackageJson => require(appPackageJson).pathname;
// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath (appPackageJson) {
    const publicUrl = getPublicUrl(appPackageJson);
+ 	const pathName = getPathName(appPackageJson);// 如果未来发生变化，可以调整package的pathname也可以在这里修改
-   const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
+ 	const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : `/${pathName}`);
    return ensureSlash(servedUrl, true);
}
```

/scripts/start.js  
```
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
-process.env.NODE_ENV == 'dev' ? 'development'
+process.env.NODE_ENV = process.env.NODE_ENV == '' || process.env.NODE_ENV == 'dev' ? 'development' : process.env.NODE_ENV;
+if (process.env.NODE_ENV == 'development') {
+    console.log('开发环境');
+} else {
+    console.log('调试版本');
+}
……
```

复制/scripts/build.js => /scripts/custom.js，只是需要对.env文件有环境的判断，所以头20行修改为下面的代码：  
```
'use strict';

// Do this as the first thing so that any code reading it knows the right env.
if(process.env.NODE_ENV == 'production'){
  console.log('调用生产环境env');
}else{
  console.log('调用'+ process.env.NODE_ENV +'环境env');
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

// Ensure environment variables are read.
require('../config/env');
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
```

增加/scripts/shell.js
```
const shell = require('shelljs');
const fs = require('fs');
const chalk = require('chalk');
const log = console.log;
const _packageJson = fs.readFileSync('./package.json'),
	packageJson = JSON.parse(_packageJson),
	dir = packageJson.pathname;// 读取package.json的pathname
const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
	throw new Error('The NODE_ENV environment variable is required but was not specified.');
}
log(chalk.blue.bgRed.bold('项目' + dir + '，执行npm run build 命令'));
if (shell.exec('npm run build:'+NODE_ENV).code !== 0) {
	shell.echo('Error: npm run build:'+NODE_ENV+' failed');
	shell.exit(1);
}

log(chalk.blue.bold('1. 新build内容移动到对应目录'));
shell.mv('-f', './build', '../webapp-express/public');

log(chalk.blue.bold('2. 切换到对应目录'));
shell.cd('../webapp-express/');

log(chalk.blue.bold('3. 拉取最新代码'));
shell.exec('git pull');

log(chalk.blue.bold('4. 删除旧内容'));
shell.rm('-rf', './public/' + dir);

log(chalk.blue.bold('5. build目录改名'));
shell.mv('-f', './public/build', './public/' + dir);

log(chalk.blue.bold('6. 提交内容'));
shell.exec('git add .');
shell.exec("git commit -m 'autocommit " + dir + "'");
shell.exec('git push');

log(chalk.green.bold('结束'))
```

时间仓促，就只把需要调整的地方写出来  
10月24日开始，每个人晚上5点的时候在自己的项目中就运行`npm run deploy:qa`，交叉（互相）冒烟测试后，再到webapp-sandbox上跑个脚本让美国那边可以看到成果。

另外，也请大家把当天的成果整理个list出来。

