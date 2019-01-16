## 微信小程序


### 微信小程序开发入门
开发小程序的第一步，你需要拥有一个小程序帐号，通过这个帐号你就可以管理你的小程序。具体可见(官方文档)[https://developers.weixin.qq.com/miniprogram/dev/]
#### 申请小程序账号
点击 (https://mp.weixin.qq.com/wxopen/waregister?action=step1)[https://mp.weixin.qq.com/wxopen/waregister?action=step1] 根据指引填写信息和提交相应的资料，就可以拥有自己的小程序帐号。

### 流行的小程序开发框架
目前比较流行的小程序开发框架主要有 (WePY)[https://tencent.github.io/wepy/] (mpvue)[http://mpvue.com/mpvue/] (Taro)[https://nervjs.github.io/taro/docs/taroize.html] ，我们简单对比下。

WePY 应该是比较早的小程序开发框架了，而且也是腾讯内部开源的一款框架。它主要解决了小程序开发较为松散，不能用 NPM 包，自定义组件开发不友好等问题。相比于原生的开发方式，已经是大大地增强了开发体验，提高了开发效率。  
mpvue 是美团点评技术团队开源的一款小程序开发框架，相较于 WePY，mpvue 则是完全用 Vue 的开发方式来开发小程序，开发体验较 WePY 相比有了进一步的提升。  
Taro 则是我们京东凹凸实验室团队开源的一款小程序开发框架，与 mpvue 相反，Taro 用的是 React 的开发方式来开发小程序，可以说又是另一个派别了。  
具体看下面表格：  
<table border="1px" align="center" bordercolor="black" width="80%">
  <tr>
    <th width="20%" bgcolor=yellow></th>
    <th width="20%" bgcolor=yellow>原生开发</th>
    <th width="20%" bgcolor=yellow>WePY</th>
    <th width="20%" bgcolor=yellow>mpvue</th>
    <th width="20%" bgcolor=yellow>Taro</th>
  </tr>
  <tr>
    <td> 开发方式 </td>
    <td> JS,JSON,WXML,WXSS</td>
    <td> 类 Vue 开发，wpy 文件</td>
    <td> Vue 开发方式</td>
    <td> React 开发方式</td>
  </tr>
  <tr>
    <td>NPM支持</td>
    <td>非常规支持</td>
    <td>支持 </td>
    <td>支持 </td>
    <td>支持 </td>
  </tr>
  <tr>
    <td> ES6+ 特性支持 </td>
    <td> 小部分不支持 </td>
    <td> 支持 </td>
    <td> 支持 </td>
    <td> 支持 </td>
  </tr>
  <tr>
    <td> CSS 预编译器支持 </td>
    <td> -  </td>
    <td> 支持 </td>
    <td> 支持 </td>
    <td> 支持 </td>
  </tr>
  <tr>
    <td> 状态管理 </td>
    <td> -  </td>
    <td> Redux</td>
    <td> VueX</td>
    <td> Redux</td>
  </tr>
  <tr>
    <td> 生命周期 </td>
    <td> 小程序生命周期</td>
    <td> 小程序生命周期</td>
    <td> Vue 的生命周期</td>
    <td> React 的生命周期</td>
  </tr>
  <tr>
    <td> 流行程度 </td>
    <td> - </td>
    <td> 14.9k个 Star  </td>
    <td> 14.1k个 Star  </td>
    <td> 10.5k个 Star </td>
  </tr>
</table>
