# verdaccio安装和配置
sinopia已经很久没有更新和维护，verdaccio目前还在更新和维护。

## 安装
首先配置好node和npm，再全局安装`npm i verdaccio -g`，安装后要进行配置文件的修改  

```
storage: ./storage
auth:
htpasswd:
   file: /.htpasswd
uplinks:
npmjs:
   url: http://registry.npmjs.org/
packages:
'@*/*':
   access: $all
   publish: $authenticated
'*':
   access: $all
   publish: $authenticated
   proxy: npmjs
logs:
- {type: stdout, format: pretty, level: http}
listen: 0.0.0.0:4873
http_proxy: http://代理服务器ip:8080
https_proxy: http://代理服务器ip:8080
```

## 常用配置  
+ storage：  
仓库保存的地址，publish时仓库保存的地址。
+ auth：  
htpasswd file：账号密码的文件地址，初始化时不存在，可指定需要手工创建。 
+ max_users：  
默认1000，为允许用户注册的数量。  
为-1时，不允许用户通过npm adduser注册。  
但是，当为-1时，可以通过直接编写htpasswd file内容的方式添加用户。
++ 语法：  
用户名:{SHA}哈希加密的字符=:autocreated 时间
加密算法：SHA1哈稀之后再转换成 Base64 输出就好

+ uplinks:   
配置上游的npm服务器，主要用于请求的仓库不存在时到上游服务器去拉取。
+ packages:   
配置模块。access访问下载权限,publish包的发布权限。 
格式如下： 
scope: 
权限：操作 
scope:两种模式 
一种是 @/ 表示某下属的某项目
另一种是 * 匹配项目名称(名称在package.json中有定义)
权限： 
l access: 表示哪一类用户可以对匹配的项目进行安装(install)
l publish: 表示哪一类用户可以对匹配的项目进行发布(publish)
l proxy: 如其名，这里的值是对应于 uplinks 的名称，如果本地不存在，允许去对应的uplinks去取。
操作：

l $all 表示所有人(已注册、未注册)都可以执行对应的操作
l $authenticated 表示只有通过验证的人(已注册)可以执行对应操作，注意，任何人都可以去注册账户。
l $anonymous 表示只有匿名者可以进行对应操作（通常无用）
l 或者也可以指定对应于之前我们配置的用户表 htpasswd 中的一个或多个用户，这样就明确地指定哪些用户可以执行匹配的操作 
听端口和主机名。 
localhost:4873 　　　　 #默认
0.0.0.0:4873　　　　　　 #在所有网卡监听
代理
```
#http_proxy: http://xx.com/  #http代理
#https_proxy: https://xx.com/  #https代理
#no_proxy: localhost,127.0.0.1  #不用代理的iP
```
修改了配置文件后，运行命令  
`verdaccio -c config.yml`
