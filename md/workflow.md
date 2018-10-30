# front-end workflow 前端的工作流
一般的工作流就是建立标准化的流程，并进行调整不断演进，适应当前团队的情况。grunt gulp 相对而言已经比较落伍，使用上也不断处于下降。一直自己想搭建新式工作流，了解了npm scripts后觉得非常方便，后来从掘金小册上看到完整的文章，整理思路和自己的经验进行分享。
## why npm scripts?
随着社区的发展，各种基础工具你都可以信手拈来，只要你会使用 [npmjs.com](npmjs.com) 去搜索，或者去 libraries.io 上搜索。在遇到技术重构或版本修改的冲突（线上要功能1->hotfix，开发要功能1->new release）除去需要将功能颗粒度拆分的足够细，既可以使用git submodule，也可以采取npm不同版本的输出。  
相对而言，我更喜欢npm的工作方式，采取git submodule只能是在tag上做文章，每次上线还是需要覆盖性上传，并且每个版本说明其实建立不易，用不了多久干嘛的谁都不记得；  
如果采取npm scripts方式，可以直接npm update components@version，内部搭建一个sinopia，开发者使用nrm 内部管理开发版本，或直接publish到npm官方。简单，清晰；最重要回滚方便，都是一行命令搞定。

## shell

&& 串行 & 并行