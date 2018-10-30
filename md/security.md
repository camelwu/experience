# Web安全
现在前端肯定也需要知道安全问题，作为网站开发者，要保证基础的三点：
1. 保密性
数据内容不能泄漏，加密是常用方法
2. 完整性
数据内容不能被篡改，特别是现在oAuth盛行的年代，协议要求sign签名，就是保证双方数据完整。一旦信息被改会发生什么不言而喻
3. 可用性
网站服务是可用的

## 前端攻击方式
1. SQL注入
影响网络设备的正常、有效运行，提供非正确的信息返回或不能正常服务。DoS攻击
2. XSS（cross-site scripting）脚步攻击

3. CSRF（cross-site request forgery）请求伪造

## https加密方式
HTTPS其实是有两部分组成：HTTP + SSL / TLS，也就是在HTTP上又加了一层处理加密信息的模块。服务端和客户端的信息传输都会通过TLS进行加密，所以传输的数据都是加密后的数据。具体是如何进行加密，解密，验证的，且看下图。  
![Alt https流程图](../static/https.png)
1.服务器用RSA生成公钥和私钥  
2.把公钥放在证书里发送给客户端，私钥自己保存  
3.客户端首先向一个权威的服务器检查证书的合法性，如果证书合法，客户端产一段随机数，这个随机数就作为通信的密钥，我们称之为对称密钥，用公钥加密这段机数，然后发送到服务器  
4.服务器用密钥解密获取对称密钥，然后，双方就已对称密钥进行加密解密通信了  

如果对公钥和私钥不太理解，可以自行百度  