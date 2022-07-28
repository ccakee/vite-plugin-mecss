# vite-plugin-mecss

### 简介

可以使css代码属性化，使得样式可以以属性的形式书写：如下
```
<div style="width:100px;height:100px;margin:30px;color:red;border: 10px solid #ccc;">
    test text
</div>
```
↓ 
```
<div w="100" h="100px" m="30" color="red" bor="10 #ccc">
    test text
</div>

```
### 使用
使用npm或yarn下载mecss
```
npm i vite-plugin-mecss
或者
yarn add vite-plugin-mecss
```
需在vite.config.ts中引入该插件
```
import { defineConfig } from 'vite'
import mess from 'vite-plugin-mecss'
export default defineConfig({
  plugins: [mess()]
})
```
在 `serve` 或 `build`后，会在`src/assets`文件中生成 `mess.css`文件

后需在main文件中全局引入该文件
```
import { createApp } from 'vue'
import App from './App.vue'
import "./assets/mess.css"

createApp(App).mount('#app')
```
完成相关配置操作后可使用以下属性

|  style                           | meCss                     | 
|  :-----                          | :----                     | 
|  ` width:100px                 `   | ` w="100"      `             | 
|  ` height:100px                `   | ` h="100"      `             | 
|  ` top:100px                   `   | ` t="100"      `             | 
|  ` left:100px                  `   | ` l="100"      `             | 
|  ` right:100px                 `   | ` r="100"      `             | 
|  ` bottom:100px                `   | ` b="100"      `             | 
|  ` color:red                   `   | ` color="red"  `             | 
|  ` background-color:red        `   | ` bg="red"     `             | 
| ` position:static \ relative \ fixed \ absolute \ sticky ` | `static \ relative \ fixed \ absolute \ sticky  `  | 
| ` display:none \ inline \ flex \ flexbox \ flow-root \ grid \ block \ inline-block \ list-item \ run-in \ table \ inline-table \ table-row-group \ table-header-group \ table-footer-group \ table-row \ table-colume-group \ table-colume \ table-cell \ table-caption \ inherit`|`none \ inline \ flex \ flexbox \ flow-root \ grid \ block \ inline-block \ list-item \ run-in \ table \ inline-table \ table-row-group \ table-header-group \ table-footer-group \ table-row \ table-colume-group \ table-colume \ table-cell \ table-caption \ inherit`|
| ` margin:100px                  `  | ` m="100"                 ` | 
| ` margin-top:100px              `  | ` mt="100"                ` | 
| ` margin-left:100px             `  | ` ml="100"                ` | 
| ` margin-right:100px            `  | ` mr="100"                ` | 
| ` margin-bottom:100px           `  | ` mb="100"                ` | 
| ` padding:100px                 `  | ` p="100"                 ` | 
| ` padding-top:100px             `  | ` pt="100"                ` | 
| ` padding-left:100px            `  | ` pl="100"                ` | 
| ` padding-right:100px           `  | ` pr="100"                ` | 
| ` padding-bottom:100px          `  | ` pb="100"                ` | 
| ` border:1px solid #ccc         `  | ` bor="1 #ccc"            ` | 
| ` border-top:1px solid #ccc     `  | ` bor-t="1 #ccc"          ` | 
| ` border-left:1px solid #ccc    `  | ` bor-l="1 #ccc"          ` | 
| ` border-right:1px solid #ccc   `  | ` bor-r="1 #ccc"          ` | 
| ` border-bottom:1px solid #ccc  `  | ` bor-b="1 #ccc"          ` | 
| ` float:left                    `  | ` fl                      ` | 
| ` float:right                   `  | ` fr                      ` | 
| ` border-radius:10px` |`radius="10"`|
|...|...|

可使用相关单位(如若不书写单位将自动转为rem) 如 ：
` mt="10px | 10vh | 10rem | ..."  ` 
`color:"red | #cccccc | rgb(245,245,245)"`
display和position可直接以属性方式写在标签上
` <div block flex></div> `
` <div absolute t="10vh" l="20px"></div> `



