## 工作流之发包
前端一般采取gitlab进行源码管理，发包也是从这个库进行拉取并进行build和最终包文件获取的操作；但时间长了，git日志，项目文件都太过庞大。  商量了架构层面上的解决方案，直接将dist/->tar包|zip包，再提交svn。  分成两个部分，压缩部分和svn提交部分，都通过shell脚本。  

### 压缩part

#### tar实现  
将文件夹转换为.tar文件，如果不考虑window情况，直接通过node的exec方法调用shell脚本，sh脚本如下   
```
		#!/bin/bash
		START=$(date +%s)
		# prepare things
		tar -cvf dist.tar dist/
		# done  END=$(date +%s)
		DIFF=$(( $END - $START ))
		echo "$DIFF 秒搞定"
		chmod +x dist.sh
		sh dist.sh
```

压缩tar文件完成，通过node进行调用

```
		var callfile = require('child_process'); 
		var ip = '1.1.1.1';
		var username = 'test';
		var password = 'pwd';
		var newpassword = 'newpwd';
		callfile.execFile('./dist.sh',['-H', ip, '-U', username, '-P', password, '-N', newpassword],null,function (err, stdout, stderr) {
			callback(err, stdout, stderr);
		});
```

调用node现有的tar解决库，npm i tar或者npm i tar-stream等相应的库有相应的api，举下tar的代码例子

```
		var fstream = require('fstream'),
			tar = require('tar'),
			zlib = require('zlib');

		fstream.Reader({ 'path': 'dist/', 'type': 'Directory' }) /* 读取源文件夹 */
		.pipe(tar.Pack()) /* 先打成一个tar包 */
		.pipe(zlib.Gzip()) /* 压缩tar包 */
		.pipe(fstream.Writer({ 'path': 'dist.tar.gz' })); /* 完成 */
```

其他方式可以进行实际实验后再进行对比评估。  

#### zip实现  
zip格式压缩也是非常多的需要引入'zip-local'模块，[npmjs传送门地址](https://www.npmjs.com/package/zip-local)，附上代码示例：  
```
		var zipper = require('zip-local');
		
		// zipping a file to memory without compression
		var buff = zipper.sync.zip("./hello-world.java").memory();
		
		// zipping a directory to disk with compression
		// the directory has the following structure
		// |-- hello-world.txt
		// |-- cpp
		//     |-- hello-world.cpp
		// |-- java
		//     |--hello-world.java
		zipper.sync.zip("./hello/world/").compress().save("pack.zip");
```

### svn传输part

直接上shell脚本  
```
		#!/bin/bash

		# 初始化SVN的工作目录

		# 用法: init DOWNLOAD_DIR Project_Name 

		DOWNLOAD=$1

		ProjName=$2

		if [ "$DOWNLOAD" == "" ] || [ "$ProjName" == "" ]; then

			exit 1

		fi


		#svn mkdir file:///var/svn/repos/test/$ProjName /

		#-m "Make a new DIR for $PrejName"

		#svn mkdir file:///var/svn/repos/test/$ProjName/src /

		#-m "make a src DIR for $PrejName"
		# 需要添加的文件   

		TO_ADD_FILE=(`svn status $WORK_DIR | grep ^? | awk '{printf "%s ", $2}'`)

		#echo ${TO_ADD_FILE[*]}

		if [ "$TO_ADD_FILE" != "" ];then

			svn add ${TO_ADD_FILE[*]}

		fi


		svn commit -m "Add File in $ProjName"


		#!/bin/bash

		# 提交删除的文件

		# 用法: del ProjectWorkDir

		ProjName=$1

		if [ "$ProjName" == "" ]; then

			exit 1

		fi


		WORK_DIR=/home/xwz/test/$ProjName/dst

		cd $WORK_DIR


		# 需要删除的文件   

		TO_DEL_FILE=(`svn status $WORK_DIR | grep ^D | awk '{printf "%s ", $2}'`)

		if [ "$TO_DEL_FILE" != "" ]; then

			svn del ${TO_DEL_FILE[*]}

		fi


		svn commit -m "Del File in $ProjName"
```

