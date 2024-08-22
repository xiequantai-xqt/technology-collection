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

当然可以。Electron 应用的生命周期主要由主进程 (`main process`) 控制，它负责管理应用的生命周期以及与渲染进程 (`renderer process`) 的通信。以下是Electron应用生命周期中的一些关键事件及其触发时机：

## 应用生命周期事件（主进程）

1. **`ready`**:
   - **触发时机**: 当 Electron 完成初始化，并且已经准备好创建浏览器窗口时。
   - **用途**: 创建窗口、初始化应用的状态等。
2. **`window-all-closed`**:
   - **触发时机**: 当所有窗口都被关闭时。
   - **用途**: 在非 macOS 平台上，可以选择退出应用或执行清理工作。
3. **`before-quit`**:
   - **触发时机**: 当所有窗口关闭后，应用即将退出前。
   - **用途**: 可以取消退出或执行最后的清理工作。
4. **`will-quit`**:
   - **触发时机**: 所有窗口关闭后，如果没有阻止退出，此事件将在 `before-quit` 之后触发。
   - **用途**: 执行最终的清理工作。
5. **`quit`**:
   - **触发时机**: 当应用真正退出时。
   - **用途**: 此事件主要用于内部使用。
6. **`activate`**:
   - **触发时机**: 当 Dock 图标被点击而没有其他窗口打开时（仅 macOS）。
   - **用途**: 创建一个新的窗口或使已有的窗口聚焦。
7. **`open-file`**:
   - **触发时机**: 当应用被用来打开一个文件时。
   - **用途**: 处理打开文件的逻辑。
8. **`open-url`**:
   - **触发时机**: 当应用被用来打开一个 URL 时（仅 macOS）。
   - **用途**: 处理打开 URL 的逻辑。
9. **`second-instance`**:
   - **触发时机**: 当另一个实例试图启动时。
   - **用途**: 在当前实例中处理新数据或命令。
10. **`will-finish-launching`**:
    - **触发时机**: 在 macOS 上，当应用程序即将完成启动过程时触发，通常在 `ready` 事件之前。
    - **用途**: 设置文件打开和 URL 打开监听器，以及启动崩溃报告和自动更新。

## 浏览器窗口生命周期事件 (BrowserWindow)

1. **`close`**:
   - **触发时机**: 当窗口被关闭时。
   - **用途**: 执行清理工作或保存状态。
2. **`closed`**:
   - **触发时机**: 当窗口已经完全关闭后。
   - **用途**: 清除对窗口的引用，避免内存泄漏。
3. **`focus`**:
   - **触发时机**: 当窗口获得焦点时。
   - **用途**: 更新界面状态或开始记录活动。
4. **`blur`**:
   - **触发时机**: 当窗口失去焦点时。
   - **用途**: 停止记录活动或保存状态。
5. **`ready-to-show`**:
   - **触发时机**: 当窗口准备就绪可以显示时。
   - **用途**: 显示窗口或更新其内容。
6. **`show`**:
   - **触发时机**: 当窗口变为可见时。
   - **用途**: 更新窗口状态或执行与显示相关的操作。
7. **`hide`**:
   - **触发时机**: 当窗口变为不可见时。
   - **用途**: 执行与隐藏相关的操作。

## 渲染进程事件 (webContents)

1. **`did-start-loading`**:
   - **触发时机**: 当页面开始加载时。
   - **用途**: 更新加载状态或显示加载指示器。
2. **`did-stop-loading`**:
   - **触发时机**: 当页面加载完成时。
   - **用途**: 移除加载指示器或执行页面加载后的操作。
3. **`did-fail-load`**:
   - **触发时机**: 当页面加载失败时。
   - **用途**: 显示错误页面或提供重试机制。
4. **`dom-ready`**:
   - **触发时机**: 当 DOM 加载完成时。
   - **用途**: 开始执行与 DOM 相关的操作。
5. **`new-window`**:
   - **触发时机**: 当页面尝试打开新窗口时。
   - **用途**: 控制新窗口的打开方式。
6. **`page-title-updated`**:
   - **触发时机**: 当页面标题发生变化时。
   - **用途**: 更新窗口标题或通知用户。
7. `did-finish-load`：
   - 触发时机：在页面加载完成后会被触发。
   - 用途：页面的加载过程已经完成。
