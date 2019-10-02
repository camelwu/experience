# create-react-app使用
简单整理一下使用过程




## 修改react-scripts来自定义create-react-app的模板
create-react-app是一个无需任何配置就能轻松创建react应用使用的命令行工具，它主要是使用react-scripts来配置需要的webpack、babel等一系列工具。

react-scripts创建的应用可以满足大部分的需求，但是有时候我们需要修改或者创建自己的配置项。react-scripts提供了一个命令eject，使用eject命令可以将react-scripts内置的各种配置项暴露出来，这时候我们就可以通过更改配置文件。

eject可以让你自定义所有配置项。但是如果有很多相似的项目，建议fork一份react-scripts和其他需要的packges，做一个自己的模板使用。

### 自定义create-react-app模版
1. fork一份自己的代码  
> 打开create-react-app，fork出自己的一份create-react-app。建议fork一个稳定的分支，master不是稳定的。

在packages目录里，有一个目录react-scripts。react-scripts这个目录里包含了build、test、start你的react app的脚本。
2. 修改配置  

把我们fork好的create-react-app clone到本地，checkout一个稳定版的tag，打开`react-scripts/scripts/init.js`这个文件。
```
// Change displayed command to yarn instead of yarnpkg
const displayedCommand = useYarn ? 'yarn' : 'npm';
console.log();
+ console.log('Hello my world.');
console.log(`Success! Created ${appName at ${appPath}}`);
console.log('Inside that directory, you can run serveral commands:');
console.log();
console.log(chalk.cyan(`  ${displaydedCommand} start`));
console.log('    Starts the development server.');
console.log();
```
在文件里面加一行console.log('Hello my world.');