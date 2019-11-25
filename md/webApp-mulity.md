# webapp
v2.0 Multiple SPAs are grouped together and combined by nginx or express. The only risk now is data sharing.  
v2.0 多个SPA组合到一起，通过nginx或express组合到一起，目前唯一风险就是数据共享。  

## How it works
Each spa change 37 lines in `/config/paths.js` before build, plus the corresponding directory name, such as: chat, discover, home, invest, manage, as follows:  
每个spa打包时在`/config/paths.js`中37行，加上相应的目录名字，比如chat、discover、home、invest、manage，具体如下：  
```
- envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/");
+ envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : "/manage");
```

After builded, it can be combined using nginx or express  
nginx或express进行路由组合   
 
`nginx`
> T said that the nginx solution on S3 is not easy to implement.

```
location  /discover {
		alias /Users/ws/zilly/webapp-discover/build/;         #discover folder, like nginx/html/discover
		index index.html index.htm;
		try_files $uri  $uri/ /discover/;
}
location /discover/:slug {
    alias /discover/;       #discover-detail-router
    index index.html index.htm;
    try_files $uri  $uri/ index.html =404;
}
location  /user {
		alias /Users/ws/zilly/webapp-onboarding/build/;             #like: https://domain/user
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /sign-in {
		alias /Users/ws/zilly/webapp-onboarding/build/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /sign-up {
		alias /Users/ws/zilly/webapp-onboarding/build;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /reset-password {
		alias /Users/ws/zilly/webapp-onboarding/build/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /link-sent {
		alias /Users/ws/zilly/webapp-onboarding/build/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /select-role {
		alias /Users/ws/zilly/webapp-onboarding/build/;
		index index.html index.htm;
		try_files $uri  $uri/ /user/;
}
location  /manage {
		alias /Users/ws/zilly/webapp-manage/build;
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

# testing server

1. OS： Centos|Ubuntu
lunix is ok，i don't care，same as s3 is better
2. Operating environment：nginx, node, jenkins
node version >= 10
3. domain: XX.tellusapp.com 
Backend development needs to be added to the cross-domain to allow browsers to access interfaces across domains


