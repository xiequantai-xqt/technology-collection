# HOOKS

> 基本的useState和useEffect前面介绍了

## useRef

作用：获取DOM元素

1. 使用useRef创建ref对象，并且与元素绑定

```jsx
const inputRef = useRef(null)
<input type="text" ref={inputRef}/>
```

2. 通过current属性获取到DOM对象

```jsx
console.log(inputRef.current)
```

#  路由

安装包：

```shell
npm i react-router-dom
```

## 使用路由

需求：创建一个可以切换登录页（/login）和文章页（/article）的路由系统

###  第一步，创建路由页面

> src\page\Article\index.js

```javascript
const Article = ()=>{
    return (
        <div>我是文章页</div>
    )
}
export default Article
```

> src\page\Login\index.js

```javascript
const Login = ()=>{
    return (
        <div>我是登录页</div>
    )
}
export default Login
```

### 第二步，创建router实例对象，并且配置路由对应关系

> src\router\index.js

```javascript
import { createBrowserRouter } from "react-router-dom";
import Article from "../page/Article";
import Login from "../page/Login";

const router = createBrowserRouter([
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/article',
        element: <Article/>
    }
])
export default router;
```

### 第三步，导入并绑定路由

> src\index.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import router from './router';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // 路由绑定
  <RouterProvider router={router}></RouterProvider>
);
```

## 路由导航

### 声明式导航

语法：

```javascript
<Link to="/article">文章</Link>
```

解释：

通过组件的to属性指定要跳转到的路由path，组件会被浏览器解析为a链接，如果需要传参，通过字符串拼接的方式来完成。

### 编程式导航

编程式导航是指通过`useNavigate`钩子得到导航方法，然后通过调用方法进行路由跳转。

例如：

```jsx
import { useNavigate } from "react-router-dom"

const Login = ()=>{
    const navigate = useNavigate()
    return (
        <div>
            <div>我是登录页</div>
            <button onClick={()=>navigate('/article')}>去文章页</button>
        </div>
    )
}
export default Login
```

## 编程式导航传参

> 声明式导航也是一样的

### searchParams传参

这里需要用到的hook是useSearchParams，这个方法可以获取到参数，参数传递的时候拼接参数。

传递参数：

```jsx
navigate('/article?id=100')
```

接收参数：

```jsx
const [params] = useSearchParams()
let id = params.get('id')
```

### params传参

传递参数：

```jsx
navigate('/article/1001')
```

在配置路由时，添加占位符（:id）

```jsx
import { createBrowserRouter } from "react-router-dom";
import Article from "../page/Article";
import Login from "../page/Login";

const router = createBrowserRouter([
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/article/:id',
        element: <Article/>
    }
])
export default router;
```

接收参数：

```javascript
const params = useParams()
let id = params.id
```

## 嵌套路由

步骤：

1. 使用children属性配置路由嵌套关系；
2. 使用`<Outlet/>`组件配置二级路由渲染出口的位置；

### 创建三个组件

> src\page\Layout\index.js

```javascript
const Layout = ()=>{
    return (
        <div>
            <div>我是一级路由Layout</div>
        </div>
    )
}
export default Layout
```

> src\page\About\index.js

```javascript
const About = ()=>{
    return (
        <div>
            <div>我是关于页</div>
        </div>
    )
}
export default About
```

> src\page\Board\index.js

```javascript
const Board = ()=>{
    return (
        <div>
            <div>我是面板页</div>
        </div>
    )
}
export default Board
```

### 完善路由配置

> router/index.js

```javascript
import { createBrowserRouter } from "react-router-dom";
import Article from "../page/Article";
import Login from "../page/Login";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
                path:'board',
                element: <Board/>
            },
            {
                path:'about',
                element:<About/>
            }
        ]
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/article',
        element: <Article/>
    }
])
export default router;
```

就是在Layout组件下面添加个children属性。

### 配置二级路由的出口

> src\page\Layout\index.js

```javascript
import { Link, Outlet } from "react-router-dom"

const Layout = ()=>{
    return (
        <div>
            <div>我是一级路由Layout</div>
            <Link to="/board">面板</Link>
            <Link to="/about">关于</Link>
            {/* 配置二级路由的出口 */}
            <Outlet/>
        </div>
    )
}
export default Layout
```

### 默认二级路由

当访问一级路由时，默认的二级路由组件会被渲染。做法：只需要在二级路由的位置去掉path，设置index属性为true。

> router/index.js

```diff
import { createBrowserRouter } from "react-router-dom";
import Article from "../page/Article";
import Login from "../page/Login";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";

const router = createBrowserRouter([
    {
        path:'/',
        element: <Layout/>,
        children:[
            {
-               path:'board',
+               index: true,
                element: <Board/>
            },
            {
                path:'about',
                element:<About/>
            }
        ]
    },
    {
        path:'/login',
        element: <Login/>
    },
    {
        path:'/article',
        element: <Article/>
    }
])
export default router;
```

### 404路由

步骤：

1. 准备一个NoteFound组件；
2. 在路由表数组的末尾，以“*”号作为路由path配置路由；

> NotFound/index.js

```javascript
const NotFound = ()=>{
    return <div>404页面</div>
}
```

> router/index.js

```javascript
{
    path:'*',
    element:<NotFound/>
}
```

### 两种路由模式

- history模式：createBrowerRouter，例如url/login
- hash模式：createHashRouter，例如url/#/login

# Redux

作用：通过集中管理的方式管理应用的状态。

## 概述

redux的使用步骤：

1. 定义一个reducer函数，接收两个参数state和action
   - state：管理的数据初始状态；
   - action：对象type标记当前想要什么样的修改
   - reducer函数的作用：根据不同的action对象，返回不同的新的state（数据不可变原则，需要返回新的状态）
2. 使用createStore方法传入reducer函数，生成一个store实例对象；
3. 使用store实例对象的**subscribe方法** 订阅数据的变化（数据一旦发生变化，subscribe内部的回调函数会自动执行）；
4. 使用store实例对象的**dispatch方法提交action对象**触发数据变化（告诉reducer你想怎么改变数据）；
5. 使用store实例对象的**getState方法** 获取最新的状态数据更新到视图中；

示例：

> 不和任何框架绑定，不使用任何构建工具，使用纯redux实现计数器

> redux-counter.html

```html
<script>
	// 1.定义reducer函数
    function reducer(state={count:0},action){
        if(action.type == 'INCREMENT'){
            return {count: state.count+1}
        }
        return state
    }
    //2.生成store实例对象
    const store = Redux.createStore(reducer)
    //3.通过store实例对象的subscribe方法订阅数据变化
    store.subscribe(()=>{
        // 5.获取最新状态，更新视图
        console.log('state变化了')
    })
    //4.通过dispatch方法提交action对象，触发数据变化
    const inBtn = document.getElementById('increment')
    inBtn.addEventListener('click',()=>{
        // 新增
        store.dispatch({
            type:'INCREMENT'
        })
    })
</script>
```

redux数据修改分为三个核心概念：

1. state——一个对象，用来存放我们管理的数据状态；
2. action——一个对象，用来描述你想怎么修改数据，例如`{type:'INCREMENT',count:1}`；
3. reducer——一个函数，根据action的描述返回一个新的state；

## 在react框架中使用

> 安装两个插件Redux Toolkit和react-redux，第一个是简化书写redux方式，第二个是用来连接react和redux的中间件

安装工具：

```shell
npm i @reduxjs/toolkit react-redux
```

一般项目的store目录结构：

```shell
project/
│
├── src/
│   ├── components/
│   ├── containers/
│   ├── store/             # Redux Store 目录
│   │   ├── actions/       # Action Creators 文件夹
│   │   │   ├── actionTypes.js # Action Types 常量定义
│   │   │   ├── exampleActions.js # 示例：某个功能领域的Action Creator
│   │   │   └── ...            # 其他Action Creator文件
│
│   │   ├── reducers/      # Reducers 文件夹
│   │   │   ├── index.js   # 组合所有Reducer并导出根Reducer
│   │   │   ├── exampleReducer.js # 示例：某个功能领域的Reducer
│   │   │   └── ...         # 其他Reducer文件
│
│   │   ├── middleware/    # 中间件（如thunk、saga等）
│   │   │   ├── thunk.js   # 示例：Thunk中间件配置
│   │   │   ├── saga.js    # 示例：Redux Saga配置（如果使用）
│   │   │   └── ...        # 其他中间件配置
│
│   │   ├── selectors/     # Selectors 文件夹（可选）
│   │   │   ├── exampleSelectors.js # 示例：某个功能领域的Selector
│   │   │   └── ...          # 其他Selector文件
│
│   │   ├── storeConfig.js # Store配置文件（创建Store实例、中间件应用等）
│   │   └── types/         # TypeScript类型声明（如果使用TypeScript）
│   │       └── ...         # Redux相关的类型声明文件
│
│   ├── App.js             # 应用入口组件
│   ├── index.js           # 应用入口文件
│   └── ...                # 其他项目文件（如样式、静态资源等）
│
└── package.json          # 项目依赖和配置
```

解释：

- `src/store/actions`: 存放Action Creator函数的文件夹。这些函数负责生成描述状态变化意图的Action对象。可以按功能领域划分不同的文件，如`exampleActions.js`。
  - `actionTypes.js`: 可选文件，用于定义Action Types常量，有助于代码的清晰性和易维护性。
- `src/store/reducers`: 存放Reducer函数的文件夹。Reducer是纯函数，接收当前状态和接收到的Action，返回新的状态。同样按功能领域划分不同的文件，如`exampleReducer.js`。在`index.js`文件中，通过`combineReducers()`函数将所有相关的reducer合并成一个根reducer。
- `src/store/middleware`: 存放中间件配置的文件夹。如`thunk.js`用于配置支持异步Action的Thunk中间件，`saga.js`（如果使用）用于配置Redux Saga等副作用管理库。
- `src/store/selectors`（可选）: 存放Selector函数的文件夹。Selector用于从状态树中选择特定数据，避免在组件中直接遍历或操作状态，提高代码的可读性和性能。
- `src/store/storeConfig.js`: 该文件负责创建并配置Redux Store实例，包括引入中间件、预设初始状态（如果有）、应用持久化存储插件（如`redux-persist`）等。
- `src/store/types`（如果使用TypeScript）: 存放Redux相关的类型声明文件，为Action、Reducer状态、Store等定义类型。



但是，这个demo在store下面创建modules目录，即便通常项目不会这么干。

> 不会这么干的原因：
>
> `store`目录下没有`modules`目录，是因为通常情况下，`store`目录主要关注Redux Store本身的配置、Reducer的组织、Action Creators的定义以及可能的中间件设置等。这些内容直接与Store的核心功能和机制相关，而不会进一步细分到具体的业务或功能模块。
>
> 在某些项目中，尤其是大型或高度模块化的应用，可能会选择将与Redux相关的文件（如actions、reducers、selectors、types等）按照业务或功能模块进行组织，放在一个单独的`modules`目录下。但这种组织方式通常发生在项目根目录的更高层级，而不是直接在`store`目录下。这种情况下，`store`目录依然专注于Store本身的整体配置，而模块化的Redux代码则位于`src/modules`（或其他类似命名的目录）中。

> 例如：

```shell
project/
│
├── src/
│   ├── components/
│   ├── containers/
│   ├── modules/           # 模块化Redux相关文件
│   │   ├── auth/         # 以auth模块为例
│   │   │   ├── actions.js
│   │   │   ├── reducer.js
│   │   │   ├── selectors.js
│   │   │   ├── types.js
│   │   │   └── ...        # 其他模块内部文件
│   │   ├── todo/         # todo模块
│   │   │   ├── actions.js
│   │   │   ├── reducer.js
│   │   │   ├── selectors.js
│   │   │   ├── types.js
│   │   │   └── ...        # 其他模块内部文件
│   │   └── ...            # 其他模块目录
│
│   ├── store/             # Redux Store 目录
│   │   ├── actions/
│   │   ├── reducers/
│   │   ├── middleware/
│   │   ├── selectors/
│   │   ├── storeConfig.js
│   │   └── types/
│   ├── App.js
│   ├── index.js
│   └── ...
│
└── package.json
```

在这种结构中，`store`目录下的文件仍然集中处理Store的整体配置和核心逻辑，而各个业务模块的Redux相关代码则在`src/modules`目录下按照各自的功能领域进行组织。在`store/reducers/index.js`中，通过遍历`modules`目录下的所有模块，使用`combineReducers()`将各个模块的Reducer合并成根Reducer。

总结来说，`store`目录下没有`modules`目录，是因为`store`关注的是Redux Store的全局配置和核心逻辑，而不是具体业务模块的组织。若项目采用模块化的方式组织Redux代码，这些模块通常会被置于项目根目录的更高层级，而非直接在`store`目录下创建`modules`子目录。

### 基本使用

> demo的代码：实现counter的案例

#### 使用React Toolkit创建counterStore

> src\store\modules\counterStore.js

```js
import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name:'counter',
    // 初始化state
    initialState:{
        count:0
    },
    // 定义reducer，注意，reducer是同步函数
    reducers:{
        inscrement(state){
            state.count++
        }
    }
})

// 解构actionCreater函数
const { inscrement }  = counterStore.actions
// 获取reducer
const reducer = counterStore.reducer

/**
 * 以按需导出的方式导出actionCreater
 * 以默认导出的方式导出reducer
 */
export { inscrement }
export default reducer
```

> src\store\index.js

```js
import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import counterStore from './modules/counterStore'

const store = configureStore({
    reducer:{
        counter: counterStore
    }
})
export default store;
```

#### 为React注入store

> react-redux负责把redux和react连接起来，内置Provider组件通过store参数把创建好的store实例注入到应用中，连接正式建立。

> src\index.js

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

#### React组件中使用store的数据

需要用到一个钩子函数useSelector，作用是把store中的数据映射到组件中。

> App.js

```js
import { useSelector } from "react-redux";

function App() {
  // state点后面的“counter”是组装reducer的名字
  const { count } = useSelector(state=>state.counter)
  return (
    <div className="App">
      {count}
    </div>
  );
}

export default App;
```

#### React组件修改store中的数据

这里用到的hook函数是useDispatch，作用是生成提交action对象的dispatch函数，调用时传入actionCreater函数。

> App.js

```js
import { useDispatch, useSelector } from "react-redux";
import { inscrement } from "./store/modules/counterStore";
function App() {
  // state点后面的“counter”是组装reducer的名字
  const { count } = useSelector(state=>state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      {count}
      <button onClick={()=>dispatch(inscrement())}>+1</button>
    </div>
  );
}

export default App;
```

小结：

- 组件中获取store中的数据——`useSelector`
- 组件中获取dispatch方法——`useDispatch`

### 提交action时传参

步骤：

1. 在reducer的同步修改方法中添加action对象参数；
2. 在调用actionCreater的时候传递参数，参数会被传递到action对象payload属性上；

> App.js

```diff
import { useDispatch, useSelector } from "react-redux";
import { inscrement } from "./store/modules/counterStore";
function App() {
  // state点后面的“counter”是组装reducer的名字
  const { count } = useSelector(state=>state.counter)
  const dispatch = useDispatch()
  return (
    <div className="App">
      {count}
-     <button onClick={()=>dispatch(inscrement())}>+1</button>
+     <button onClick={()=>dispatch(inscrement(1))}>+1</button>
    </div>
  );
}

export default App;
```

> store\modules\counterStore.js

```diff
import { createSlice } from "@reduxjs/toolkit";

const counterStore = createSlice({
    name:'counter',
    // 初始化state
    initialState:{
        count:0
    },
    // 定义reducer，注意，reducer是同步函数
    reducers:{
-    inscrement(state){
-           state.count++
-       }
+       inscrement(state,action){
+           state.count = state.count + action.payload
+       }
    }
})

// 解构actionCreater函数
const { inscrement }  = counterStore.actions
// 获取reducer
const reducer = counterStore.reducer

/**
 * 以按需导出的方式导出actionCreater
 * 以默认导出的方式导出reducer
 */
export { inscrement }
export default reducer
```

### 用redux管理异步状态

步骤：

1. 创建store的写法保持不变，配置好同步修改状态的方法
2. 单独封装一个函数，在函数内部return一个新函数，在函数中：
   1. 封装异步请求，获取到数据；
   2. 调用同步actionCreater，传入异步数据生成一个action对象，并且使用dispatch提交
3. 组件中dispatch的写法保持不变

> src\store\modules\channelStore.js

```js
import { createSlice } from "@reduxjs/toolkit";

const channelStore = createSlice({
    name:'channel',
    initialState:{
        channelList:[]
    },
    // 定义同步修改方法
    reducers:{
        setChannels(state,action){
            state.channelList = action.payload
        }
    }
})
// 解构actionCreater函数
const { setChannels } = channelStore.actions
/**
 * 异步请求部分
 */
const fetchChannelList = ()=>{
    return async(dispatch)=>{
        // 这里异步获取数据
        const res = await axiox.get('http://666.com')
        dispatch(setChannels(res.data.channels))
    }
}
const reducer = channelStore.reducer
/**
 * 导出
 * 1.异步请求函数
 * 2.reducer
 */
export { fetchChannelList }
export default reducer
```

> store/index.js，组装reducer

```js
import { configureStore } from "@reduxjs/toolkit";
// 导入子模块reducer
import channelStore from './modules/channelStore'

const store = configureStore({
    reducer:{
        channel: channelStore
    }
})
export default store;
```

> App.js，消费组件

```js
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchChannelList } from "./store/modules/channelStore";
function App() {
  const { channelList } = useSelector(state=>state.channel)
  const dispatch = useDispatch()
  // 使用useEffect触发异步请求
  useEffect(()=>{
    dispatch(fetchChannelList)
  },[dispatch])
  return (
    <div className="App">
      <ul>
        {channelList.map(item=><li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  );
}

export default App;
```

