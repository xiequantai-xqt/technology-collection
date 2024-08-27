# ts支持什么类型？

ts支持的类型，第一种js中的类型，第二种其他的类型。

js有的类型：

1. number
2. string
3. boolean
4. null
5. undefined
6. symbol
7. object（数组、对象、函数）

其他的类型：

1. 联合类型
2. 自定义类型
3. 接口类型
4. 元组
5. 字面量类型
6. 枚举
7. void
8. any

说明：

- null和undefined可以分配任意的类型

```
let b:number = undefined
```

# 类型别名

作用：用来声明数据类型，有点类似于js中的变量声明

语法：

> 注意，类型名称的规范写法是大写字母开头

```
type 类型名称 = 类型
```

使用场景：当同一个类型被多次使用，可以通过类型别名简化该类型的使用

举例：

```
type Mytype = number[]
let arr:Mytype = [1,5,9]
```

# typeof

作用：提取出值、或者变量的类型

## 注意点

第一，typeof 可以写在注解里，typeof后面要跟着值，或者变量

```
const obj = {
    name:'carl',
    age:12
}
const obj2: typeof obj = {
    name:'doudou',
    age:45
}
```

第二，typeof不能取出函数调用的返回值的类型，即typeof fn()，这样写是错误的，

取出函数调用的返回值的类型只能通过泛型

```
const fn = (a:number,b:number)=>{
    return a+b
}
// 这种写法是错误的
const result = typeof fn(1,2)=3
```

# 断言（as）

使用场景：ts推断不准确，我们更了解需要的类型是什么，让ts听我们的。

```
const onInput = document.getElementById('username') as HTMLInputElement
console.log(onInput.type)
```

# 对象类型

作用：描述对象的结构，包含什么键名、键值，以及键值的类型

对象的键值上存在函数的写法：

> 写法一

```
/* 语法 */
// 创建类型别名
type Person = {
    sayHi:(形参类型)=>返回值类型
}
/* demo */
type ObjType = {
    sayHi:(str:string)=>void
}
let obj:ObjType = {
    sayHi:(str)=>{
        console.log(str)
    }
}
obj.sayHi('你好')
```

> 写法二

```
/* 语法 */
// 创建类型别名
type Person = {
    sayHello(形参类型):返回值类型
}
/* demo */
type ObjType = {
    sayHello(str:string):void
}
let obj:ObjType = {
    sayHello:(str)=>{
        console.log(str)
    }
}
obj.sayHello('你好')
```

# 元组

元组是另一种类型的数组，确切地描述了多少元素，以及索引对应的类型，更加精确地表达了数组的结构。

示例：

```
type Arr = [number,string,boolean]
const arr:Arr = [123,'123',true]
console.log(arr)
```

# 枚举

枚举提供了一组可选的取值范围，类似于联合类型+字面量。

语法：

```
enum 名称{键名=键值}
```

枚举既可以当做类型使用，又可以当做值使用（这句话看不懂，可以通过下面的示例看出）

枚举分为两种，一种是文本枚举，另一种是数字枚举。当枚举的属性值是字符串时，是文本枚举。当枚举没有属性值或者属性值为数字时，是数字枚举。

## 数字枚举

特点：

1. 键值可以省略，自动从0开始递增。如果设置初始值，就会从初始值开始递增；
2. 命名要语义化，大写字母开头，也可以全大写；

没有设置初始值的示例：

```
// 数字枚举
enum SelectType{
    one,
    two,
    three
}
// 当做类型使用
function selectFn(data:SelectType){
    console.log(data)
}
// 当做值使用
selectFn(selectType.one)//0
selectFn(selectType.two)//1
selectFn(selectType.three)//2
```

设置初始值的示例：

```
// 数字枚举
enum SelectType{
    one=20,
    two,
    three
}
// 当做类型使用
function selectFn(data:selectType){
    console.log(data)
}
// 当做值使用
selectFn(selectType.one)//20
selectFn(selectType.two)//21
```

## 文本枚举

```
// 文本枚举
enum SelectType{
    one='one',
    two='two',
    three='three'
}
// 当做类型使用
function selectFn(data:SelectType){
    console.log(data)
}
// 当做值使用
selectFn(selectType.one)// 'one'
selectFn(selectType.one)// 'two'
selectFn(selectType.one)// 'three'
```

## 枚举类型和字面量类型的异同点

相同点：表示一组可选时的取值范围

不同点：枚举的值，只能是字符串或者是数字，字面量类型的值可以是任意类型。

## 使用场景

1. 字面量联合类型更加灵活，更容易扩充数据
2. 如果范围可选，不会变化，可以使用枚举，变化不够灵活

# 数组

## 常规写法

```
// 语法
number[]
let arr1:number[] = [1,2,6]
```

## 泛型写法

```
// 语法
Array<number>
let arr2:Array<number> = [1,6,8]
```

# 函数

## 第一种写法

> 单独指定函数参数、返回值的类型

```
// 语法格式
(参数1：类型,参数2:类型)：类型
// 例子
const add = (num1:number,num2:number):number =>{
    return num1+num2
}
add(1,2)
```

## 第二种写法

> 同时指定函数参数、返回值的类型

```
// 语法格式
type 类型名字 = (参数1:类型，参数2:类型)=>类型
const 函数名字:类型名字 = (参数1，参数2)=>{return xxx}

// 例子
type Mytype = (num1:number,num2:number)=>number
const add:Mytype = (num1,num2)=>{
    return num1+num2
}
add(1,2)
```

## 函数的可选参数

语法形式：在形参后面加问号（？），类似于ES6的可选链的写法

使用场景：函数的参数可以不传，可以使用可选参数

示例：

```
function add（a?:number,b?:number）{
    return a+b
}
```

注意：可选参数必须放在必选参数的后面，可选参数后面不能存在必选参数。

## 说明

1. 同时指定类型的写法，函数只能是箭头函数的形式
2. js中的函数没有返回值，返回值为undefined
3. ts中的函数如果没有指定返回值，返回值为void，表示空
4. 在ts中没有返回值时，也可以return undefined，但是不推荐这种写法

# 联合类型

语法，使用“|”隔开

示例：

```
let arr:(number|string)[] = [1,'5',6]
```

# 接口

用途：用来描述对象结构类型，功能上type类似。

## interface与type的异同点

相同点：

1. 两者都可以描述一个对象或者函数
2. 都支持拓展（extends），语法不一样

区别：

1. 接口（interface）只能为对象指定别名，类型别名（type）可以为任意类型指定别名；
2. interface可以继承其他的接口，达到复用的效果。这里需要注意，只有接口之间的extends关键字可以理解为继承，使用泛型时，也会有extends关键字，彼时理解为逻辑与；
3. 同名的接口会自动合并；
4. 接口的书写规范，interface的名称都是以大写字母i开头，例如ICat。类型别名，名称的首字母大写，尾部跟着Type；

## interface继承

```
// 命名接口
interface IPerson{
    eye:string
    height:number
    canSay:(str:string)=>void
}
// 继承
interface IChinese extends Iperson{
    sayHi:(str:string)=>void
}
let obj:IChinese = {
    eye:'big',
    height:180,
    canSay:str=>{
        console.log(str)
    },
    sayHi:str=>{
        console.log(str)
    }
}
```

## 注意点

1. 接口名称可以是任意的合法变量名称，变量名称首字母推荐以大写字母I开头；
2. 由于每一行只有一个属性类型，因此属性类型后面不加分号（；）；
3. 使用习惯方面：
   1. 第一种，全部使用type；
   2. 第二种，能使用interface，就用interface；

# 字面量类型

字面量类型一般配合联合类型使用，用来表示一组明确的可选的取值范围。

```
// 字面量+联合类型
type ActionType = "todo/add"|"todo/delete"
function dispatch(action:{type:ActionType}){
    console.log(123)
}
dispatch({type:"todo/delete"})
```

# any、unknown、never

- any，表示任意类型，能兼容所有类型，也能够被所有类型兼容，使用 any 时类型推导与检查不会生效；
- unknown，表示类型未知、但未来会确定类型；
- never，代表无类型，不带类型信息，常见的是 throw error 函数

```
function throwError():never{
    throw new Error()
}
```

# 泛型函数

泛型函数的作用：比普通的函数更容易复用，作用范围更精确。

有两种写法：分开指定类型、同时指定类型。

## 关于T变量的说明

T代表ts捕获的类型，它可以是任意类型，可以和任意类型结合使用，例如，数组：T[]，对象：{age:T }，元组：[T，T]。如果不和其他类型配合，就代表any。

## 分开指定类型

语法结构：

> 说明：占位符是变量，原则上可以使用任何表示变量的字母，但是规范上使用T表示

```
fn<占位符>(a:占位符):占位符{
    函数体
}
```

示例：

```
function generateStr<T>(str:T):T{
    return str
}
// 调用函数的简单写法
let str = generateStr("aaa")
```

## 同时指定类型

语法结构：

```
type 类型名 = <占位符>(形参：占位符)=>占位符
```

示例：

```
type Fntype = <T>(str:T)=>T

const generateStr:Fntype = str=>{
    return str
}
// 调用函数的完整写法
let str = generateStr<string>("我是字符串")
```

# 泛型约束

作用：指定更精准的范围

语法：<占位符 extends 类型>

注意：这里的extends不能理解为继承，只有接口之间才能理解为继承，应该理解为逻辑与。

## 为什么使用泛型约束？

默认情况下，泛型的类型变量T可以代表多种类型，这导致无法访问任意属性。

示例：

> 下面是获取参数的长度

```
function fn<T>(value:T):T{
    console.log(value.length)
    return value
}
fn("a")
```

T 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length。

此时，就需要为泛型添加约束来收缩类型取值范围。

## 怎么做泛型约束？

方式有两种，第一，指定更加具体的类型。第二，添加约束。

### 指定更加具体的类型

比如，将参数类型修改为 Type[](Type 类型的数组)，因为只要是数组就一定存在 length 属性，因此就可以访问了。更确切的解释是，更严格地限制函数参数的类型。

```
function fn<Type>(value:Type[]):Type[]{
    console.log(value.length)
    return value
}
```

### 添加约束

示例：

```
// 创建一个接口
interface ILength{
    length: number
}
// Type extends ILength添加泛型约束
// 解释：表示传入的类型必须要满足ILength接口的要求才行，也就是得有一个number类型的length属性
function fn<T extends ILength>(value:T):T{
    console.log(value.length)
    return value
}
```

描述：

1. 创建描述约束的接口 ILength，该接口要求提供 length 属性
2. 通过 extends 关键字使用该接口，为泛型(类型变量)添加约束
3. 该约束表示：传入的类型必须具有 length 属性

# keyof

作用：从对象结构中，提取所有的键名，返回由键名组成的联合类型+字面量类型，表示一组可选的取值范围。

语法：keyof 类型（不是keyof 值）。

注意：keyof 关键字接收一个对象类型，生成其键名称(可能是字符串《对象》或数字《数组》)的联合类型。

示例：

```
type Fntype = {
    name: string;
    age: number;
}
const obj:Fntype = {
    name: "carl",
    age: 18
}
const fn = (key:keyof Fntype)=>{
    console.log(obj[key])
}
fn("age")
```

# 泛型工具

## Partial

作用：将所有的字段转为可选的

```
type ObjType = {
    name: string;
    age: number;
}
const obj:Partial<ObjType> = {
    name:'carl',
    age: 18
}
```

## Readonly

作用：用来构造一个类型，将 Type 的所有属性都设置为 readonly(只读)

```
type ObjType = {
    name: string;
    age: number;
}
type NewObjType = Readonly<ObjType>
const obj:NewObjType = {
    name:'carl',
    age: 18
}
// 不可以改变属性值，这个操作是错误的
obj.name = 19
```

## Pick

作用：选取属性

语法：Pick<对象结构，键名组成的联合类型>

```
interface ObjectType{
    name: string;
    age: number;
    gender: boolean;
}
const obj:Pick<ObjectType,"age"|"gender"> = {
    age: 18,
    gender: true
}
```

## Omit

作用：删除属性

语法：Omit<对象结构，删除的键名组成的联合类型>

```
type ObjectType = {
    name: string;
    age: number;
    gender: boolean;
}
const obj:Omit<ObjectType,"age"|"gender"> = {
    name:'carl'
}
```

# 索引类型签名

## 对象类型

作用：在对象结构中，给键名和键值指定类型，[key : string] : 值类型。

使用场景：当无法确定对象中有哪些属性(或者说对象中可以出现任意多个属性)，此时，就用到索引签名类型了。例如React中的透传。

示例：

```
type AuthRouteProps = {
    path: string;
    component: any;
    [key:string]:any
}
function AuthRoute(props:AuthRouteProps){}
AuthRoute({path:'/',component:'h1',a:123,b:23,c:96})
```

说明：

1. 使用 [key: string] 来约束该接口中允许出现的属性名称。表示只要是 string 类型的属性名称，都可以出现在对象中。
2. 这样，对象 obj 中就可以出现任意多个属性(比如，a、b 等)。
3. key 只是一个占位符，可以换成任意合法的变量名称。
4. 隐藏的前置知识:JS 中对象({})的键是 string 类型的。

注意点：

1. 通常索引类型和any配合使用
2. 不能滥用

## 数组类型

在 JS 中数组是一类特殊的对象，特殊在数组的键(索引)是数值类型。并且，数组也可以出现任意多个元素。所以，在数组对应的泛型接口中，也用到了索引签名类型。

示例：

```
interface MyArray<T>{
    [n:number]:T
}
let arr:MyArray<number> = [1,3,5]
```

说明：

1. MyArray 接口模拟原生的数组接口，并使用 [n: number] 来作为索引签名类型。
2. 该索引签名类型表示:只要是 number 类型的键(索引)都可以出现在数组中，或者说数组中可以有任意多个元素。
3. 同时也符合数组索引是 number 类型这一前提。

# 索引访问类型

作用：对象结构类型中，访问某个键对应值的类型。

语法：类型[键名（也可以是键名组成的联合类型）]。

```
type ObjType = {
    one: string,
    two: number,
    three: boolean
}
type MyType1 = ObjType["one"]
type MyType2 = ObjType["one"|"two"]
type MyType3 = ObjType[keyof ObjType]
```

# 映射类型

作用：从旧结构中，转换成新的键和值类型。

语法：[ key in keyof 类型]：类型

示例：

```
type OldType = {
    name: string,
    age: number
}
// 映射出新的类型
type NewType = {
    [key in keyof OldType]: number
}
const old:NewType = {
    name: 123,
    age: 18
}
```

注意：映射类型只能在类型别名（type）中使用，不能在接口（interface）中使用。

# 提取函数返回值的类型

语法：ReturnType<typeof 函数>。

```
const fn = (a:number,b:number)=>{
    return a+b
}
// 提取函数返回值的类型
type FnType = ReturnType<typeof fn>
const result = (x:FnType,y:FnType):FnType=>{
    return x+y
}
```

# 泛型接口

使用场景：描述大量相似的结构。泛型接口调用时，不能省略泛型。成员都可以省略泛型接口的泛型。

```
// 定义一个泛型接口类型
interface IResponse<T>{
    message: string;
    status: number;
    data: T;
}
// 调用泛型接口
const data1:IResponse<{name:string,age:number}>={
    message:"success",
    status: 200,
    data:{
        name: 'carl',
        age: 18
    }
}
const data2:IResponse<{person:string,height:number,male:boolean}>={
    message:"success",
    status: 200,
    data:{
        person:'中国人'，
        height: 180,
        male: true
    }
}
```

# 多泛型变量

泛型的类型变量可以有很多个，并且类型变量之间还可以相互约束。

语法：

```
fn <泛型变量1，泛型变量2> （形参1：T，形参2：K）{ }
```

示例：

```
function fn<T,K extends keyof T>(obj:T,key:K){
    return obj[key]
}
console.log(fn({name:'carl',age:18},"name"))
```

# 忽略类型TS报错

在src目录下面创建一个 typings.d.ts：

> typings.d.ts

```typescript
// global.d.ts 或 typings.d.ts
declare var OSS: any; // 或者更具体的类型定义
```

