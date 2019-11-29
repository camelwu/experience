# webapp 
多个SPA组合到一起，通过nginx或express组合到一起，唯一风险就是数据共享。  

## How it works
每个spa打包时在`/config/paths.js`，加上相应的目录名字，比如chat、manage，具体如下：  
```
- envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
+ envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/manage");
```

nginx或express进行路由组合   
 
`nginx`

```
	location  /discover {
		alias /webapp/discover/;
		index index.html index.htm;
		try_files $uri  $uri/ /discover/;
	}
	location  /user {
		alias /webapp/user/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /sign-in {
		alias /webapp/user/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /sign-up {
		alias /webapp/user;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /reset-password {
		alias /webapp/user/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /link-sent {
		alias /webapp/user/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /select-role {
		alias /webapp/user/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
	}
	location  /manage {
		alias /webapp/manage;
		index index.html index.htm;
		try_files $uri  $uri/ /manage/;
	}
```

`express`  

```
const express = require('express'),
logger = require('morgan'),
path = require('path'),
app = express(),
history = require('connect-history-api-fallback'); // Third party library for h5 history

const staticPath=process.env.static ||'public'; // all build files in public
const port=process.env.port || 3300;
// rewrite visit routes
app.use(history({
	// rewrites rules, just like nginx try_file to index.html
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
      from: /\/discover\/{0,}$/,
      to: 'discover/index.html'
    },
    {
      from: /\/manage\/{0,}$/,
      to: 'manage/index.html'
    },
		// etc
  ]
}));
app.use(express.static(path.join(__dirname, staticPath)));
app.use(logger('dev'))
app.listen(port)

```
