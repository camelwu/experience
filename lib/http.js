const http = require('http'),
fs = require('fs');

fs.exists("https://msb-image.oss-cn-hangzhou.aliyuncs.com/video/2020-09-05/5f4cff3f72b29f706f74cd802e2a898b.mp4", function(exists) {
	console.log(exists ? "ye" : "no");
});
http.createServer(function (req, res) {
  console.log('访问路径是：' + req.url);
  console.log('客户端地址：', req.socket.remoteAddress, req.socket.remotePort);

  var url = req.url;
 
  if (url === '/') {
    res.end('index page');
  }
}).listen(3000);
console.log('server has started...');
