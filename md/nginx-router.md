# nginx 路由配置

　　nginx中location对url匹配；

　　语法：location [=|~|~*|^~] /uri/ { … }

　　当匹配中符合条件的location，则执行内部指令；如果使用正则表达式，必须使用~*表明不区分大小写或者~区分大小写匹配；例如：location ~* \.(gif|jpg|jpeg)$ ；当配皮成功后，将停止往下匹配；如果没有找到，则使用常规自字符串处理结果；

　　如果不是用正则表达式；可使用=严格匹配；

　　如果使用^~前缀用于一个常规字符串；表示如果路径匹配，则不测试正则表达式；

　　总结：指令按下列顺序被接受

　　　　1:=前缀的指令严格匹配这个查询；如果找到停止往下匹配

　　　　2:挣下的常规字符串，长的在前，如果这个匹配使用^~前缀，匹配停止；

　　　　3:正则表达式，按配置文件的顺序；

　　　　4:如果第三步产生匹配。则使用这个结果；停止匹配；否则使用第二部的匹配结果；

四个案例：

location = / {

　　　　#只匹配／查询

　　}

　　location / {

　　　　#匹配任何查询，所有请求都是以/开头。但是正则表达式规则和长的块规则将被优先匹配和查询；

　　}

　　location ^~ /images/ {
　　　　# 匹配任何已 /images/ 开头的任何查询并且停止搜索。任何正则表达式将不会被测试。
　　　　}

　　location ~* \.(gif|jpg|png)${

　　　　#匹配任何以gif、jpg、png结尾的请求。然后所有/images/目录的请求将使用第三个

　　}

　　例子请求:

　　　　/ -> configuration A

　　　　/documents/document.html -> configuration B

　　　　/images/1.gif -> configuration C

　　　　/documents/1.jpg -> configuration D
 

八个location案例

location = / {  #精确匹配，/后面不能加任何字符串，符合此条件就直接返回数据，不再像下匹配。
    if (-d $request_filename) {
         root /usr/local/nginx/html/;  #当用户访问newweb的时候，则显示此目录的内容，除此之外访问其他的任何目录都不匹配。
　　[动作A]
}

location  / {
  # 因为所有的地址都以/开头，所以这条规则将匹配到所有请求，但是非精确匹配会采取正则和最长字符串会优先匹配，因此还会向下继续匹配，比如当访问/bbs的时候，还需要看下面是否更精确的匹配。
  [ 动作B] 
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 如果后面的正则表达式都没有匹配到，就匹配这一条
  [动作C] 
}

location ^~ /images/ {   #匹配任何以/images/ 开头的任何请求并且停止搜索，后面任何正则表达式将不会被测试。
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [动作D] 
}

location ~* \.(gif|jpg|jpeg)$ {  #~*为不区分大小写
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求/images/下的图片会被动作D匹配处理，因为动作D有^~会优先匹配并终止匹配，所以到达不了这一条正则
  [动作E] 
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在，如果动作D存在，则这一条就不生效。
  [动作F] 
}

location /images/abc {
  #最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在，如果D存在，则这一条就不生效。
  #F与G的放置顺序是没有关系的
  [动作G] 
}

location ~ /images/abc/ {
  # 动作D存在，这一条不生效，如果注销动作D，则会优先最长匹配 动作G 开头的地址，然后向下匹配，到这一条的时候就会匹配并生效。
    [ configuration H ] 
}

 匹配优先级，顺序 no优先级：
(location =) > (location 完整路径) > (location ^~ 路径) > (location ~,~* 正则顺序) > (location 部分起始路径) > (/)

上面的匹配结果
按照上面的location写法，以下的匹配示例成立：

/ -> config A
精确完全匹配，即使/index.html也匹配不了

/downloads/download.html -> config B
匹配B以后，往下没有任何匹配，采用B

/images/1.gif -> configuration D
匹配到F，往下匹配到D，停止往下

/images/abc/def -> config D
最长匹配到G，往下匹配D，停止往下
你可以看到 任何以/images/开头的都会匹配到D并停止，FG写在这里是没有任何意义的，H是永远轮不到的，这里只是为了说明匹配顺序

/documents/document.html -> config C
匹配到C，往下没有任何匹配，采用C

/documents/1.jpg -> configuration E
匹配到C，往下正则匹配到E

/documents/Abc.jpg -> config CC
最长匹配到C，往下正则顺序匹配到CC，不会往下到E
 

当匹配成功后location中可以使用rewrite进行路由重写；

　　首先需要了解nginx rewrite中可以使用到的全局变量；

　　$args　　:请求中get的参数,例如a=1&b=2;

　　$body_remote_add　　:二进制客户地址

　　$body_byte_sent　　:相应时发送出去的body字节数数量，即使链接中断这个数据也是精确的；

　　$content_length　　:请求头中的Content_length字段

　　$content_type　　:请求中的Content_type字段

　　$document_root　　:当前请求在root指令中的位置;服务器中绝对路径

　　$document_url　　:与uri相同

　　$host　　:请求主机头字段，否则为服务器名称；

　　$hostname　　:保存了当前请求中不包含指令的uri，例如：http://www.aaa.com/index.php?a=1中的/index.php;

　　$host　　:请求的服务器名称；

　　$http_user_agent　　:客户端浏览器的详细信息，如果使用 chrome 和Firefox 则访问结果是

Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.87 Safari/537.36 #chrome的浏览器信息
Mozilla/5.0 (Windows NT 6.1; WOW64; rv:46.0) Gecko/20100101 Firefox/46.0  #Firefox的浏览器信息
　　$http_cookie　　: 客户端cookie信息；

　　$limit_rate　　:如果nginx服务器中使用limit_rate配置了显示网络速率，则会显示，如果没有则为0

　　$remote_addr　　:客户端的地址，每个客户端的公网ip，

　　$remote_port　　:客户端请求nginx服务器时随机打开的端口，这个每个客户端自己的端口；

　　$remote_user　　:已经经过auth basic module验证的用户名

　　$request_body_file　　:作反向代理是发给服务端的本地资源名称

　　$request_method　　:请求志愿的方式，get\put\delete等

　　$request_filename　　:请求的资源文件的路径名称

　　$request_url　　:请求参数的原始uri，不包含主机名；如"/index.php?a=1"

　　$squery_string　　:保存了url请求的指令，与$args相同

　　$scheme　　:请求协议；如http、https、ftp

　　$server_protacpl　　:保存了客户端请求资源使用的协议的版本，如http/1.0、http/1.1

　　$server_addr　　:保存了服务器ip

　　$server_name　　:保存了服务器的主机名；该变量不一定是用户访问的域名，是你的server_name配的地址；

　　$host　　:保存了用户访问的域名

　　$server_port　　:服务器端口

　　$uri与$document_uri相同　　：不包含指令的uri地址

如www.aaa.com/index.php?a=1&b=2中的index.php

 

防盗链：注意location生效规则，否则防盗链不起作用。

配置参数说明：

　　none

　　　　'Referer' :来源头部为空的情况

　　blocked

　　　　'Referer' :来源头部不为空，但里面的值被代理或者防火墙删除，这些值都不以http://或者https://开头

　　server_names

　　　　'Referer' :来源头部包含当前的server_name,就是域名

　　arbitary string :任意字符串，定义服务器名或者可选的url前缀，主机名可以使用*开头或者结尾，在检测来源头部这个过程中，来源域名中的主机端口将会被忽视；

　　regular expression :正则表达式，表示排除https://或者http://开头的字符串

下面两个案例：

location ~* \.(gif|jpg|png|bmp)$ {
    valid_referers none blocked *.aaa.com server_names ~\.google\. ~\.baidu\.;
    if ($invalid_referer) {
        return 403;
        #rewrite ^/ http://www.aaa.com/1.jpg;
    }
}
以上所有来至aaa.com和域名中包含google和baidu的站点都可以访问到当前站点的图片,如果来源域名不在这个列表中，那么$invalid_referer等于1，在if语句中返回一个403给用户，这样用户便会看到一个403的页面,如果使用下面的rewrite，那么盗链的图片都会显示403.jpg。如果用户直接在浏览器输入你的图片地址,那么图片显示正常，因为它符合none这个规则.
 

location ~* \.(gif|jpg|png|swf|flv)$ { # 防盗链设置,对于后缀是gif、jgp等格式的生效
    valid_referers none blocked  a.com  *.a.com; #定义允许访问的请求链接
    if ($invalid_referer) {
        return 404;
    }
}

none：在浏览器输入网站域名直接访问的请求，需要允许访问的
blocked：有referer首部，但是referer首部被清除了，一般是防火墙改过的请求
server_name:带服务器名称的，一般是本机或其他服务器的请求，a.com和*.a.com是本公司的域名，要允许访问于是要先允许本机的访问，再禁止其他服务器的访问
 

 location /public/admin/images/y.jpg {
      #valid_referers none blocked *.aaa.com server_names *.aaa.com    ;
      #valid_referers none blocked www.sss.com; #设置只有该域>    名可以访问
      valid_referers none blocked 111.111.111.11; #设置只有该域名可以访>    问
      if ($invalid_referer) {
          rewrite ^ http://baidu.com$request_uri?;
          return 403;
          rewrite ^/ http://www.aaa.com/1.jpg;
      }
 }
 

常用正则匹配

. ： 匹配除换行符以外的任意字符
? ： 重复0次或1次
+ ： 重复1次或更多次
* ： 重复0次或更多次
\d ：匹配数字
^ ： 匹配字符串的开始
$ ： 匹配字符串的介绍
{n} ： 重复n次
{n,} ： 重复n次或更多次
[c] ： 匹配单个字符c
[a-z] ： 匹配a-z小写字母的任意一个
小括号()之间匹配的内容，可以在后面通过$1来引用，$2表示的是前面第二个()里的内容。正则里面容易让人困惑的是\转义特殊字符。
 

参考if判断语句

if ($http_user_agent ~ MSIE) { #如果客户端是微软的IE浏览器，就将请求rewrite到msie目录下。
    rewrite ^(.*)$ /msie/$1 break;
} 

if ($http_cookie ~* "id=([^;]+)(?:;|$)") { # 如果cookie匹配正则，就设置变量$id等于正则引用部分
    set $id $1; 设置$id等于正则第一个括号内匹配的部分
 } 

if ($request_method = POST) { #如果提交方法为POST，则返回状态405（Method not allowed）。return不能返回301,302
    return 405;
} 

if ($slow) { #限速，$slow可以通过 set 指令设置
    limit_rate 10k;
} 

if (!-f $request_filename){ #如果请求的文件名不存在，则反向代理到localhost 。这里的break也是停止rewrite检查
    break;
    proxy_pass  http://127.0.0.1; 
} 

if ($args ~ post=140){ #如果query string中包含"post=140"，永久重定向到example.com
    rewrite ^ http://example.com/ permanent;
}
 

nginx 配置案例参考

http {
    # 定义image日志格式
    log_format imagelog '[$time_local] ' $image_file ' ' $image_type ' ' $body_bytes_sent ' ' $status;
    # 开启重写日志
    rewrite_log on;

    server {
        root /home/www;

        location / {
                # 重写规则信息
                error_log logs/rewrite.log notice; 
                # 注意这里要用‘’单引号引起来，避免{}
                rewrite '^/images/([a-z]{2})/([a-z0-9]{5})/(.*)\.(png|jpg|gif)$' /data?file=$3.$4;
                # 注意不能在上面这条规则后面加上“last”参数，否则下面的set指令不会执行
                set $image_file $3;
                set $image_type $4;
        }

        location /data {
                # 指定针对图片的日志格式，来分析图片类型和大小
                access_log logs/images.log mian;
                root /data/images;
                # 应用前面定义的变量。判断首先文件在不在，不在再判断目录在不在，如果还不在就跳转到最后一个url里
                try_files /$arg_file /image404.html;
        }
        location = /image404.html {
                # 图片不存在返回特定的信息
                return 404 "image not found\n";
        }
}
