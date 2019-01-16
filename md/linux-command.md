## 常用操作命令
1. 连接到远端主机
```
# ssh user@ip
ssh root@100.87.0.126
```
2. copy file to remote
```
scp 

```

### 防火墙端口管理

如果要添加范围例外端口 如 1000-2000  
语法命令如下：启用区域端口和协议组合  
firewall-cmd [--zone=<zone>] --add-port=<port>[-<port>]/<protocol> [--timeout=<seconds>]

此举将启用端口和协议的组合。端口可以是一个单独的端口 <port> 或者是一个端口范围 <port>-<port> 。协议可以是 tcp 或 udp。

实际命令如下：
```
#添加
firewall-cmd --zone=public --add-port=80/tcp --permanent （--permanent永久生效，没有此参数重启后失效）

firewall-cmd --zone=public --add-port=1000-2000/tcp --permanent 

#重新载入
firewall-cmd --reload
#查看
firewall-cmd --zone=public --query-port=80/tcp
#删除
firewall-cmd --zone=public --remove-port=80/tcp --permanent
```