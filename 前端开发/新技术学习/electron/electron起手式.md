# 概述

electron集成了chromium、node.js，还可以使用Native apis调用。

- chromium：支持最新特性的浏览器
- node.js：JavaScript运行时，可以实现文件的读写等操作
- Native apis：提供了统一原生界面操作的能力

electron内部：

![](https://guiwanzhyq.oss-cn-hangzhou.aliyuncs.com/hc/img/20240819/53e6aac9-84fd-4dfb-af7f-c82ad8a2f34c.png)

主进程（Main Process）：

- 可以看做是package.json中main属性对应的文件
- 一个应用只会有一个主进程，在这个主进程里面也包含了chromium、node.js运行时环境
- 只有主进程才可以进行GUI的API操作（调用Native api），如果说某个渲染进程也想操作原生api，就需要先和主进程建立通信，然后由主进程完成具体的调用。
- 主进程可以管理所有web界面和这些web界面对应的渲染进程

渲染进程：

- windows中展示的界面通过渲染进程表现，核心功能就是渲染web界面、支持所有的DOM操作、node api的调用操作
- 一个应用可以有多个渲染进程
- 渲染进程可以通过主进程，访问原生api

# electron环境搭建

官方文档：https://www.electronjs.org/zh

```shell
mkdir my-electron-app && cd my-electron-app
yarn init
```

创建package.json

```json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

安装electron：

```shell
yarn add --dev electron
```

然后在package.json中添加一个脚本：

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

运行：

```shell
yarn start
```

## 渲染页面

> index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
    <title>Hello from Electron renderer!</title>
  </head>
  <body>
    <h1>Hello from Electron renderer!</h1>
    <p>👋</p>
    <p id="info"></p>
  </body>
  <script src="./renderer.js"></script>
</html>
```

## 运行的主进程

> main.js

```javascript
const { app, BrowserWindow } = require('electron/main')
const path = require('path')

// 创建窗口，让窗口加载一个界面，这个界面用web技术实现，这个界面运行在渲染进程中
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences:{
      preload: path.join(__dirname,'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  // 窗口被激活时，创建窗口、加载页面
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// 所有的窗口关闭时，app进程结束
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

## 预加载脚本

> preload.js

```javascript
// 获取数据的操作：通过预加载脚本从渲染器访问Node.js
window.addEventListener('DOMContentLoaded',()=>{
    const replaceText = (selector,text)=>{
        const element = document.getElementById(selector)
        if(element)element.innerText = text
    }
    for(const type of ['chrome','node','electron']){
        replaceText(`${type}-version`,process.version[type])
    }
})
```

## 交互脚本

> render.js

```javascript
```

# electron的生命周期

![](https://guiwanzhyq.oss-cn-hangzhou.aliyuncs.com/hc/img/20240820/d0b41ae6-af0f-4946-bca5-0c0d29f88901.png)

