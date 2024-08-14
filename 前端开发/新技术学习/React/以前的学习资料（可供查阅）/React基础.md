# JSX

> jsx是js的语法扩展，jsx使用大括号识别js表达式，比如常见的变量、函数调用等。

## 变量和表达式

语法示例：

```javascript
const message = 'this is message';
function App(){
    return(
         <div>
             <h1>{message}</h1>
        </div>
    )
}
```

## class和style

使用class：

> 在JSX语法中，由于class是保留字，所以使用className设置class

```javascript
const element = <div className="box">Some content</div>;
```

使用style:

```javascript
const styles = {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '20px'
};

const element = <div style={styles}>Some content</div>;
```

注意：

- 属性名需要使用驼峰命名法，例如backgroundColor代替background-color。
- 属性值需要使用字符串表示，例如'red'，'20px'

# 列表渲染

JSX中列表渲染使用map函数将一个数组渲染到组件中。

```javascript
import React from 'react';

function List(props) {
  const items = props.items.map((item, index) => {
    return <li key={index}>{item}</li>;
  });

  return (
    <ul>
      {items}
    </ul>
  );
}

export default List;
```

# 条件判断

在react框架中，通过不同的条件决定渲染不同的内容。

## 三元表达式

```javascript
function App() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? (<h1>Welcome, user!</h1>) : (<h1>Please log in.</h1>)}
    </div>
  );
}

```

## &&运算表达式

```javascript
function App() {
  const isLoggedIn = false;
  return (
    <div>
      {isLoggedIn && <h1>Welcome, user!</h1>}
      {!isLoggedIn && <h1>Please log in.</h1>}
    </div>
  );
}
```

## 复杂条件渲染

> 自定义函数+if判断语句

```javascript
// 定义文章类型
const articleType = 1
// 根据文章类型，返回不同的JSX模板
const MODE_MAP = {
  0: '我是无图模式',
  1: '我是单图模式',
  default: '我是三图模式',
};

function getArticleTem() {
  return <div>{MODE_MAP[articleType] || MODE_MAP.default}</div>;
}
function App() {
  return (
    <div>
      {/* 通过调用函数渲染不同模板 */}
      { getArticleTem() }
    </div>
  );
}

export default App;
```

# 事件绑定

## this对象

在react中使用了JS的严格模式，所以时间处理函数的this并没有绑定到组件实例上。因此react中的事件处理函数中的this默认是undefined，而不是指向组件实例。为了在事件处理函数中使用this，需要一些方法绑定this。

**方式一：使用bind绑定this**

```javascript
import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    // 在构造函数中使用bind绑定this
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}
```

**方式二：使用箭头函数定义事件处理函数**

> 使用箭头函数来定义handleClick方法，这样handleClick方法中的this就会自动绑定到组件实例

```javascript
import React from 'react';

class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this);
  }

  render() {
    return (
      <button onClick={this.handleClick}>Click me</button>
    );
  }
}
```

注意：

- 如果我们在JSX中使用箭头函数来定义事件处理函数，每次渲染时都会创建一个新的函数，可能会对性能造成影响。
- 如果我们需要在事件处理函数中使用组件的状态或属性，最好使用bind()方法来绑定this，以避免不必要的渲染。

## 传递参数

在React中，事件处理函数可以通过箭头函数或bind方法来传递参数。

```javascript
class MyComponent extends React.Component {
  handleClick(id, event) {
    console.log(`Clicked on item ${id}`);
  }

  render() {
    return (
      <div>
        <button onClick={(event) => this.handleClick(1, event)}>Item 1</button>
        <button onClick={this.handleClick.bind(this, 2)}>Item 2</button>
      </div>
    );
  }
}
```

# 组件

在React中，一个组件就是首字母大写的函数，内部存放了组件的逻辑和视图UI，渲染组件只需要把当成标签书写。

## 初识组件

简单的小例子：

> components/Button.jsx

```jsx
function Button(){
    return (
        <button>click me!!!</button>
    )
}
export default Button;
```

> App.js

```javascript
import Button from "./components/Button";
function App() {
  return (
    <div>
      <Button/>
    </div>
  );
}

export default App;
```

## useState

useState是一个React Hook函数，允许我们向组件添加一个状态变量，从而控制影响组件的渲染结果。

`const [count,setCount] = useState(0)`，解释：

1. useState是一个函数，返回值是一个数组；
2. 数组中的第一个参数是状态变量，第二个参数（set函数）用来修改状态变量，通过传入新的count值修改状态变量；
3. useState传入的参数0，将作为count的初始值；

例子：

> Button.jsx

```jsx
import { useState } from "react";

function Button(){
    const [count,setCount] = useState(0)
    const handleClick = ()=>{
        setCount(count+1)
    }
    return (
        <div>
            <div>{count}</div>
            <button onClick={handleClick}>click me!!!</button>
        </div>
    )
}
export default Button;
```

useState的修改规则：状态不可变，可以使用count+1替换掉原来的count，如果使用count++或者++count无法生效，会导致报错。

## classNames工具库优化类名

```jsx
import { useState } from "react";
import classNames from 'classnames';

function Button(){
    const [count,setCount] = useState(0)
    const handleClick = ()=>{
        setCount(count+1)
    }
    return (
        <div>
            <div>{count}</div>
            <button className={classNames('nav-item',{active: count == '1'})} onClick={handleClick}>click me!!!</button>
        </div>
    )
}
export default Button;
```

## 受控表单绑定

> 双向绑定

1. 首先，数据准备

```jsx
const [value,setValue] = useState('')
```

2. 将表单元素的value属性绑定状态，通过onChange绑定状态同步的函数

```jsx
<input
    type="text"
    value={value}
    onChange={(e)=>setValue(e.target.value)}/>
```

## 获取DOM元素

> react hook：useRef

1. 使用useRef创建ref对象，并且与元素绑定

```jsx
const inputRef = useRef(null)
<input type="text" ref={inputRef}/>
```

2. 通过current属性获取到DOM对象

```jsx
console.log(inputRef.current)
```

## 组件通信

### 父传子通信

#### 方式一：props

实现步骤：

1. 父组件传递数据：在子组件标签上绑定属性
2. 子组件接收数据：子组件通过props参数接收数据

父组件代码：

> App.js

```jsx
import Message from "./components/Message";
function App() {
  const name = 'this is name'
  return (
    <div>
      <Message name={name}/>
    </div>
  );
}

export default App; 
```

子组件代码：

> Message.jsx

```jsx
const Message = (props)=>{
    return (
        <div>
            <div>我是子组件</div>
            <div>{props.name}</div>
        </div>
    )
}
export default Message
```

注意：

1. props对象可以是任意类型数据
2. props是只读对象，子组件不能修改props对象中的数据，父组件的数据只能由父组件修改

#### 方式二：props.children

当我们把内容嵌套在子组件标签中，子组件会自动在名为children的prop属性下接收该内容。

示例：

> 父组件：App.js

```jsx
import Message from "./components/Message";
function App() {
  const name = 'this is name'
  return (
    <div>
      <Message>
          <span>this is a message</span>
      </Message>
    </div>
  );
}

export default App; 
```

> 子组件：Message.jsx

```jsx
const Message = (props)=>{
    return (
        <div>
            <div>我是子组件</div>
            <div>{props.children}</div>
        </div>
    )
}
export default Message
```

### 子传父

核心思路：在子组件中调用父组件中的函数，并且传递参数。

父组件代码：

> App.js

```js
import Message from "./components/Message";
function App() {
  const getMsg = (msg)=>{
    console.log('msg==========>',msg)
  }
  return (
    <div>
      <Message onGetSonMsg={getMsg}/>
    </div>
  );
}

export default App;
```

子组件代码：

> Message.jsx

```jsx
const Message = ({onGetSonMsg})=>{
    const sonMsg = 'this is son msg'
    return (
        <div>
            <div>我是子组件</div>
            <button onClick={()=>onGetSonMsg(sonMsg)}>sendMsg</button>
        </div>
    )
}
export default Message
```

父组件做的事：

- 定义一个消息接收函数
- 将接收函数传递给子组件

子组件做的事：

- 将子组件的数据作为参数传递给父组件的“消息接收函数”

### 兄弟组件

核心思路：借助“状态提升”机制，通过共同的父组件进行兄弟之间的通信。先是子传父（子组件1→父组件），再父传子（父组件→子组件2）。

### 使用context机制跨层级通信

实现步骤：

1. 使用createContext方法创建一个上下文对象Ctx
2. 在高一层的组件（比如App）中通过Ctx.Provider组件**提供数据**
3. 在底层组件Son2中通过useContext钩子函数获取数据

第一步：

> contexts/MyContext.js

```js
import { createContext } from "react";

// 第一步，使用createContext方法创建上下文对象
export const MsgContext = createContext()
```

第二步：

> App.js

```js
import { useState } from "react";
import Son2 from "./components/Son2";
import {MsgContext} from './contexts/MyContext'

function App() {
  const [msg, setMsg] = useState('this is a message')
  return (
    <div>
      {/* 第二步，在顶级组件（App）中通过Ctx.Provider组件提供数据 */}
      <MsgContext.Provider value={{msg,setMsg}}>
        {/* 在这里放置需要共享数据的子组件树 */}
        <Son2/>
      </MsgContext.Provider>
    </div>
  );
}

export default App;
```

第三步：

> components/Son2.jsx

```jsx
import { useContext } from 'react';
import {MsgContext} from '../contexts/MyContext.js'

const Son2 = ()=>{
    const {msg,setMsg} = useContext(MsgContext)
    return(
        <div>
            <div>子组件二</div>
            <div>{msg}</div>
        </div>
    )
}
export default Son2;
```

## useEffect

### 概述

useEffect用于创建渲染引起的操作，比如更新DOM、发送ajax请求等。

语法：

```jsx
useEffect(()=>{},[])
```

- 第一个参数，被称之为副作用函数。
- 第二个参数（可选项），在数组里放置依赖项，不同依赖项会影响到“副作用函数”的执行时机。
  - 如果数组是空的：副作用函数只会在组件渲染完毕之后执行一次（初始渲染时执行）
  - 没有依赖项：组件初始渲染时执行+组件更新时执行
  - 添加特定的依赖项：组件初始渲染时执行+特定依赖项发生变化时执行

### 清除副作用

我的理解是，在副作用函数里面做了一些操作之后，引起了额外的、不必要的反应。比如在useEffect开启了一个定时器，如果不去进行干预就会造成浏览器的内存泄漏，清理定时器的过程就是清楚副作用。

 清除副作用的语法：

> 清除副作用函数最常见的执行时机是在组件卸载时自动执行

```jsx
useEffect(()=>{
    // 实现副作用操作的逻辑
    return ()=>{
        // 清除副作用的逻辑
    }
},[])
```

## 自定义hook

自定义hook是**以use开头的**函数，通过自定义hook函数可以实现逻辑的封装和复用。

### 如何使用

示例：通过“toggle”按钮控制“this is div”这段话的显示和隐藏

不使用自定义hook函数：

```jsx
import { useState } from "react";

function App() {
  const [value,setValue] = useState(true)
  const toggle = ()=>setValue(!value)
  return (
    <div>
      {value&&<div>this is div</div>}
      <button onClick={toggle}>toogle</button>
    </div>
  );
}

export default App;
```

使用自定义hook函数：

```jsx
import { useState } from "react";

function useToggle(){
  // 可复用的逻辑代码
  const [value,setValue] = useState(true)
  const toggle = ()=>setValue(!value)
  // 哪些状态或者回调函数需要再其他组件中使用，就return出去
  return{
    value,
    toggle
  }
}
function App() {
  const { value,toggle } = useToggle()
  return (
    <div>
      {value&&<div>this is div</div>}
      <button onClick={toggle}>toogle</button>
    </div>
  );
}

export default App;
```

return的时候返回对象或者数组都可以，因为都能解构使用。

### 自定义hook函数的使用规则

1. 只能在组件中或者其他的自定义hook函数中使用，不能在组件外使用；

> 错误代码演示

```jsx
const [value,setValue] = useState('')

function App(){
    return(
    	<div></div>
    )
}
```

2. 只能在组件的顶层调用，不能嵌套在在if、for、其他函数中；

> 错误代码演示

```jsx
function App(){
    if(Math.random()>0.5){
        const [value,setValue] = useState('')
    }
    return(
    	<div></div>
    )
}
```

# 路由

安装包：

```shell
npm i react-router-dom
```

## 使用路由

需求：创建一个可以切换登录页（/login）和文章页（/article）的路由系统

### 第一步，创建路由页面

> src\page\Article\index.js

```js
const Article = ()=>{
    return (
        <div>我是文章页</div>
    )
}
export default Article
```

> src\page\Login\index.js

```js
const Login = ()=>{
    return (
        <div>我是登录页</div>
    )
}
export default Login
```

### 第二步，创建router实例对象，并且配置路由对应关系

> src\router\index.js

```js
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

```js
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

```jsx
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

```jsx
const params = useParams()
let id = params.id
```

## 嵌套路由

步骤：

1. 使用children属性配置路由嵌套关系；
2. 使用`<Outlet/>`组件配置二级路由渲染出口的位置；

### 创建三个组件

> src\page\Layout\index.js

```js
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

```js
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

```js
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

```js
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

```js
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

```js
const NotFound = ()=>{
    return <div>404页面</div>
}
```

> router/index.js

```js
{
    path:'*',
    element:<NotFound/>
}
```

### 两种路由模式

history模式：createBrowerRouter，例如url/login

hash模式：createHashRouter，例如url/#/login