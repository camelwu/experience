## workflow
大家可以简单理解为工作流程，代码质量如何把控？code-review的具体做法，code-review能否对大家的技术提升带来帮助。事实上很多类型的工作流都是可以完成这个工作，今天分享一个最常用的工作流，github上开源项目的工作流forking workflow

### forking工作流
先从操作步骤开始：
1. fork
![alt](./static/1.jpg)
在gitlab上点击Fork，将主库拷贝一份到自己namespace下
![alt](./static/2.jpg)
以hybird_app为例，在wusongbo的命名空间下，就有了一摸一样的项目
![alt](./static/3.jpg)
2. remote添加
首先确认自己的远端仓库地址，git remote -v 
![alt](./static/4.jpg)
添加自己的似有库地址, git remote add my git@gitlab.lvyuetravel.com:camel/hybrid_app.git
![alt](./static/5.jpg)
可以看到本地记录的远程仓库地址有两个，库my和库origin
3. 设定upstream
本地在提交操作之前，需要先保证与主仓库的同步，命令：  
git pull origin "branch"  
习惯了vs code或source tree的人也可以从工具直接下载操作；
核心的流程就是从origin主仓库pull下载，提交到my私有仓库上。最好是所有的分支都进行下载更新。保证代码的实时性，冲突也在自己本地解决。  
4. 更新和提交代码步骤
提交到私有库后，通过merge request与主仓库保证同步，并且选择好分支
![alt](./static/6.jpg)
可以看到最后一个提交号，如果代码本身可以操作线上merge，就会进入审核阶段，你提交的代码，写的好不好，需要写清楚。可以根据导航一步步做；做好之后就会进入最后一步code-review和技术交流阶段
![alt](./static/7.jpg)
coding质量和交流就在这一步完成。

