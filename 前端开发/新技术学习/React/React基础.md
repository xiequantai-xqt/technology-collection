# JSX

> 目标：了解它是如何让HTML和JavaScript混合编写的

> jsx是js的语法扩展，jsx使用大括号识别js表达式，比如常见的变量、函数调用等。

##  变量和表达式

语法示例：

```jsx
const message = 'this is message';
function App(){
    return(
         <div>
             <h1>{message}</h1>
        </div>
    )
}
```

##  class和style

使用class：

> 在JSX语法中，由于class是保留字，所以使用className设置class

```jsx
const element = <div className="box">Some content</div>;
```

使用style：

```jsx
const styles = {
  color: 'red',
  backgroundColor: 'blue',
  fontSize: '20px'
};

const element = <div style={styles}>Some content</div>;
```

注意点：

- 属性名需要使用驼峰命名法，例如backgroundColor代替background-color。
- 属性值需要使用字符串表示，例如'red'，'20px'

#  列表渲染

> 渲染列表项并为每个项分配一个唯一键

JSX中列表渲染使用map函数将一个数组渲染到组件中。

```jsx
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

#  条件判断

> 在react框架中，通过不同的条件决定渲染不同的内容。

##  三元表达式

```jsx
function App() {
  const isLoggedIn = true;
  return (
    <div>
      {isLoggedIn ? (<h1>Welcome, user!</h1>) : (<h1>Please log in.</h1>)}
    </div>
  );
}
```

##  &&运算表达式

```jsx
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

##  复杂条件渲染

> 自定义函数+if判断语句

```jsx
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

# 事件处理

## 合成事件

合成事件是React对原生DOM事件的一种封装，它提供了跨浏览器兼容性，并且确保事件行为的一致性。当用户触发一个事件（如点击或输入），React会捕获这个事件并创建一个合成事件对象。这个事件对象包含了事件的所有信息，比如鼠标位置、键盘按键等。

```jsx
const handleClick = (event) => {
  console.log('鼠标位置：', event.clientX, event.clientY);
}
```

## 事件绑定

在React中，你不需要像在原生JavaScript中那样使用`addEventListener`来绑定事件处理器。相反，你可以在JSX中直接通过特定的属性来绑定事件处理器。例如，对于一个按钮点击事件，你可以这样写：

```jsx
<button onClick={handleClick}>点击我</button>
```

这里的`onClick`就是React提供的事件处理器属性，而`handleClick`是你定义的一个函数，该函数会在事件触发时执行。

## 阻止默认行为

在某些情况下，你可能需要阻止事件的默认行为，比如阻止链接的跳转或者表单的提交。在React中，你可以通过调用事件对象上的`preventDefault()`方法来实现：

```jsx
const handleSubmit = (event) => {
  event.preventDefault();
  // 自定义逻辑
}

<form onSubmit={handleSubmit}>
  <input type="text" />
  <button type="submit">提交</button>
</form>
```

##  this对象

在react中使用了JS的严格模式，所以时间处理函数的this并没有绑定到组件实例上。因此react中的事件处理函数中的this默认是undefined，而不是指向组件实例。为了在事件处理函数中使用this，需要一些方法绑定this。

**方式一：使用bind绑定this**

```jsx
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

```jsx
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

```jsx
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

##  初识组件

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

```jsx
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

##   受控表单绑定

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

##  获取DOM元素

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

 **方式一：props**

实现步骤：

1. 父组件传递数据：在子组件标签上绑定属性
2. 子组件接收数据：子组件通过props参数接收数据

父组件代码：

> App.js

```javascript
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



**方式二：props.children**

当我们把内容嵌套在子组件标签中，子组件会自动在名为children的prop属性下接收该内容。

示例：

> 父组件：App.js

```javascript
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

```javascript
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

###  兄弟组件

核心思路：借助“状态提升”机制，通过共同的父组件进行兄弟之间的通信。先是子传父（子组件1→父组件），再父传子（父组件→子组件2）。

### 使用context机制跨层级通信

实现步骤：

1. 使用createContext方法创建一个上下文对象Ctx
2. 在高一层的组件（比如App）中通过Ctx.Provider组件**提供数据**
3. 在底层组件Son2中通过useContext钩子函数获取数据

第一步：

> contexts/MyContext.js

```javascript
import { createContext } from "react";

// 第一步，使用createContext方法创建上下文对象
export const MsgContext = createContext()
```

第二步：

> App.js

```javascript
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

## 生命周期的方法

React 组件的生命周期可以分为几个阶段：初始化（Mounting）、更新（Updating）、卸载（Unmounting）以及错误处理（Error Handling）。在 React 16.3 版本之后，一些生命周期方法被废弃或更改，而 React 17 和 18 继续调整了生命周期的方法。以下是在 React 16.3 及更高版本中可用的主要生命周期方法，适用于类组件：

### 初始化（Mounting）

1. **`constructor()`**
   - 构造函数，用于初始化 `this.state` 和绑定事件处理函数。

2. **`static getDerivedStateFromProps(props, state)`**
   - 静态方法，在渲染之前将 props 更新到 state。如果返回一个对象，则会与当前 state 合并。

3. **`render()`**
   - 渲染组件的方法，必须返回一个 React 元素。

4. **`componentDidMount()`**
   - 组件挂载完成后调用，常用于执行网络请求、订阅等操作。

### 更新（Updating）

5. **`static getDerivedStateFromProps(props, state)`**
   - 在每次渲染前都会调用，用于在状态更新前根据新的 props 计算新的 state。

6. **`shouldComponentUpdate(nextProps, nextState)`**
   - 决定组件是否需要重新渲染。返回 `false` 则组件不会重新渲染。

7. **`render()`**

8. **`getSnapshotBeforeUpdate(prevProps, prevState)`**
   - 在更新发生前立即调用，可以返回一个快照值供 `componentDidUpdate` 使用。

9. **`componentDidUpdate(prevProps, prevState, snapshot)`**
   - 组件更新后调用，用于执行副作用操作，如 DOM 操作或网络请求。

### 卸载（Unmounting）

10. **`componentWillUnmount()`**
    - 组件从 DOM 中移除前调用，用于清理资源，如取消网络请求或清除定时器。

### 错误处理（Error Handling）

11. **`static getDerivedStateFromError(error)`**
    - 当子组件抛出错误时调用，可以更新 state 以显示错误页面。

12. **`componentDidCatch(error, errorInfo)`**
    - 错误边界组件中捕获错误后调用，可以记录错误信息。

### 注意
- `componentWillMount` 和 `componentWillReceiveProps` 已在 React 16.3 中被标记为不建议使用，并在 React 17 中完全删除。
- `componentWillUpdate` 被弃用，但仍然存在，不过它没有替代品，因为通常不需要在更新前执行任何操作。

对于函数组件，可以使用 React Hooks 如 `useState`, `useEffect`, 和 `useRef` 来管理状态和副作用，这使得函数组件也能够处理复杂的逻辑。

## React函数组件与类组件的区别

在React中，函数组件和类组件都是用来构建用户界面的基本单元，但它们之间存在一些关键的区别。以下是它们的主要差异：

### 语法差异
- **函数组件**是简单的JavaScript函数，接收`props`作为参数并返回React元素。它们是纯函数，意味着对于相同的输入（props），它们总是返回相同的结果。
  
  ```jsx
  function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
  ```

- **类组件**需要继承`React.Component`基类，并且必须实现一个`render`方法，该方法返回要渲染的React元素。

  ```jsx
  class Welcome extends React.Component {
    render() {
      return <h1>Hello, {this.props.name}</h1>;
    }
  }
  ```

### 状态和生命周期
- 在React 16.8之前，**函数组件**不能拥有状态或使用生命周期方法。但是随着Hooks API的引入，函数组件现在可以使用`useState`, `useEffect`等Hooks来管理状态和响应组件的生命周期事件。

- **类组件**一直能够使用内部的状态（通过`this.state`）和生命周期方法（如`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`等）。

### `this`关键字
- 在**类组件**中，你必须使用`this`关键字来访问组件的`props`，`state`以及任何实例方法。
  
- 在**函数组件**中，`props`直接作为函数的参数，不需要使用`this`。

### 性能和可读性
- **函数组件**通常更简洁，易于理解和维护，因为它们不涉及复杂的类结构和`this`绑定问题。
  
- 使用Hooks的函数组件可以在保持简洁的同时，提供与类组件相同的功能，如状态管理和生命周期事件处理。

### 性能差异
- 类组件在实例化时会创建一个组件实例，这可能在组件频繁更新时导致额外的性能开销。
  
- 函数组件在每次渲染时都会重新创建，但由于它们是纯函数，所以React可以更有效地优化它们的渲染过程。

近年来，由于Hooks的引入，函数组件变得越来越流行，许多新的React应用倾向于使用函数组件而不是类组件，尽管类组件在某些情况下仍然有其用处。

# 状态管理

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

##  classNames工具库优化类名

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

##  useEffect

###  概述

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

###  清除副作用

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

## useContext

> 全局状态管理

见使用context机制跨层级通信

## useReducer

> 更复杂的状态管理

