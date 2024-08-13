# 闭包

闭包是指一个函数可以访问、操作在其外部定义，但不在全局作用域内的变量。这是因为函数被创建时会捕获其周围的词法环境。当函数被调用时，即使它在外部函数执行完毕后仍然存在，它依然可以访问到创建时的词法环境的变量。

例如：

```javascript
function outer() {
    var count = 0;
    return function inner() {
        count++;
        console.log(count);
    };
}
var closureFunc = outer();
closureFunc(); // 输出 1
closureFunc(); // 输出 2
```

在这个例子中，`inner` 函数是一个闭包，因为它可以访问 `outer` 函数的局部变量 `count`，即使 `outer` 函数已经执行完毕。

# 原型链

JavaScript中，所有对象都有一个原型对象（除了`Object.prototype`的原型是`null`）。当你尝试访问一个对象的属性或方法时，如果该对象本身没有这个属性或方法，JavaScript引擎会沿着原型链查找，直到找到该属性或方法或到达原型链的终点（通常是`null`）。

例如：

```javascript
function Person(name) {
    this.name = name;
}
Person.prototype.greet = function() {
    console.log("Hello, my name is " + this.name);
};

var john = new Person("John");
john.greet(); // 输出 "Hello, my name is John"
```

在这里，`greet` 方法并没有直接定义在 `john` 对象上，而是定义在了 `Person.prototype` 上。当调用 `john.greet()` 时，JavaScript 会沿着原型链找到 `Person.prototype` 并调用 `greet` 方法。

# 作用域

作用域定义了变量的可访问性。JavaScript有以下几种作用域：

- **全局作用域**：在任何地方都可以访问的变量。
- **函数作用域**：在函数内部定义的变量只能在该函数内部访问。
- **块级作用域**（ES6 引入）：在代码块 `{}` 内部定义的变量只能在该代码块内访问，这通常由 `let` 和 `const` 关键字声明。

例如：

```javascript
if (true) {
    let blockScopedVar = "I'm block scoped!";
}
console.log(blockScopedVar); // ReferenceError: blockScopedVar is not defined
```

在这个例子中，`blockScopedVar` 是块级作用域的变量，在 `{}` 外部访问时会抛出 `ReferenceError`。

# 异步编程

## 回调函数

这是最原始的异步处理方式。在发起一个异步操作时，提供一个函数作为参数，当异步操作完成时，该函数（回调函数）会被调用。

例如，在Node.js中处理文件读取或网络请求时常用此模式。但过度使用回调函数可能导致“回调地狱”，即多层嵌套的回调函数难以阅读和维护。

```javascript
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

什么是回调地狱？

回调地狱是指在编写JavaScript代码，尤其是处理异步操作时，由于过度使用嵌套的回调函数而导致的代码结构混乱、难以理解和维护的现象。当多个异步操作需要顺序执行，每个操作的完成都依赖于前一个操作的结果时，很容易形成这种多层嵌套的结构。

下面是一个简单的回调地狱示例：

```javascript
function readFile(file, callback) {
    // 模拟异步读取文件，实际应用中可能是xhr请求或文件系统操作等
    setTimeout(function() {
        console.log(`Reading ${file}...`);
        callback(null, `Contents of ${file}`);
    }, 1000);
}

readFile('file1.txt', function(error, content1) {
    if (error) {
        console.error('Error reading file1:', error);
    } else {
        readFile('file2.txt', function(error, content2) {
            if (error) {
                console.error('Error reading file2:', error);
            } else {
                readFile('file3.txt', function(error, content3) {
                    if (error) {
                        console.error('Error reading file3:', error);
                    } else {
                        console.log(content1);
                        console.log(content2);
                        console.log(content3);
                    }
                });
            }
        });
    }
});
```

在这个例子中，我们模拟了读取三个文件的操作，每个文件读取完成后执行下一个文件的读取。可以看到，随着异步操作数量的增加，回调函数的嵌套层级也相应增加，这不仅使得代码难以阅读，而且对于错误处理和代码维护来说也是一个噩梦。这就是所谓的“回调地狱”。

为了解决回调地狱问题，现代JavaScript引入了Promise、async/await等更优雅的异步编程模式，以减少嵌套并提高代码的可读性。

## 事件监听

利用事件驱动模型处理异步操作，如DOM事件或Node.js中的 EventEmitter。当特定事件触发时，注册的事件处理器（回调函数）会被调用。

```javascript
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
```

## 发布/订阅模式（Publish/Subscribe or Observer Pattern）

通过事件中心或消息队列来解耦发布者和订阅者。发布者发布事件，订阅者订阅感兴趣的事件。这种方式在某些库和框架中较为常见。

```javascript
const pubSub = new PubSub();
pubSub.subscribe('message', (data) => {
  console.log(`Received message: ${data}`);
});
pubSub.publish('message', 'Hello World!');
```

## Promise

Promises 是一种更现代的异步编程解决方案，它解决了回调地狱问题，提供了链式调用的语法，并能更好地处理异步操作的成功、失败以及进度。一个Promise代表一个现在、将来或永远可能可用，或者永远不会可用的值。Promise的设计目的是为了解决回调地狱问题，使异步代码更加易于理解和维护。以下是Promise的基本使用方法。

### 创建Promise

Promise通过`new Promise((resolve, reject) => {...})`构造函数创建。这个构造函数接受一个函数作为参数，该函数有两个参数：`resolve`和`reject`，它们都是函数，由JavaScript引擎提供。

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("操作成功");
    } else {
      reject("操作失败");
    }
  }, 2000);
});
```

### 使用then处理结果

当Promise的状态从`pending`变为`fulfilled`（成功）时，通过`then`方法注册的回调函数会被调用，处理成功的值。

```javascript
myPromise.then(result => {
  console.log(result); // 输出: "操作成功"
}).catch(error => {
  console.log(error); // 如果有错误，这里会捕获到
});
```

### 使用catch处理错误

catch方法用于捕获在Promise链中抛出的错误，或者是那些直接在Promise构造函数中被reject的错误。

### 链式调用

Promise的`then`和`catch`方法返回一个新的Promise，这使得多个异步操作可以顺序执行，形成链式调用。

```javascript
myPromise
  .then(result => {
    console.log(result);
    return "新的Promise结果";
  })
  .then(newResult => {
    console.log(newResult);
  })
  .catch(error => {
    console.error(error);
  });
```

### Promise.all

当需要并行执行多个Promise并等待所有都完成时，可以使用`Promise.all`方法。

```javascript
const promise1 = Promise.resolve("成功1");
const promise2 = Promise.resolve("成功2");

Promise.all([promise1, promise2])
  .then(results => {
    console.log(results); // 输出: ["成功1", "成功2"]
  })
  .catch(error => {
    console.error(error);
  });
```

### Promise.race

`Promise.race`方法接收一个Promise数组作为参数，它返回一个新的Promise，这个新的Promise在数组中任意一个Promise解决或拒绝后，立刻以相同的状态结束。

```javascript
const promiseFast = new Promise(resolve => setTimeout(resolve, 800, '快速'));
const promiseSlow = new Promise(resolve => setTimeout(resolve, 1200, '慢速'));

Promise.race([promiseFast, promiseSlow])
  .then(result => {
    console.log(result); // 可能是"快速"或"慢速"，取决于哪个先完成
  });
```

## async/await

这是基于Promise的一种更高级的异步编程模型，通过在函数声明前加上`async`关键字，可以在函数体内使用`await`关键字等待Promise的解决。这使得异步代码看起来更像是同步代码，提高了代码的可读性和可维护性。

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

# class（类）

类是ES6中引入的语法糖，用于更加清晰地实现面向对象编程（OOP）。尽管JavaScript本质上是一个基于原型的语言，类提供了一种更加接近传统OOP语言（如Java或C#）的语法，来定义对象的蓝图。

## 如何使用类

> 定义一个类的基本语法

```javascript
class ClassName {
    // 构造器 || 构造函数
    constructor(arg1,arg2){
        this.property1 = arg1;
        this.property2 = arg2;
    }
    // 实例方法
    method(){
        console.log('这是一个实例方法')
    }
    // 静态方法
    static staticMethod(){
        console.log('这是一个静态方法')
    }
}
```

## 创建实例

```javascript
const instance = new ClassName('value1','value2');
instance.method(); // 调用实例方法
ClassName.staticMethod(); // 调用静态方法
```

## 什么情况下使用类

1. **封装**：当你需要将数据和操作数据的方法组合在一起时，类可以提供封装，隐藏内部细节，仅暴露必要的接口给外部代码。
2. **继承**：类支持继承，允许你创建子类来扩展或重写父类的功能。这有助于代码的重用和模块化。
3. **多态**：通过继承和接口（虽然JavaScript没有严格意义上的接口，但可以通过约定和鸭子类型实现类似功能），你可以实现多态性，即一个接口多种实现。
4. **代码组织**：当项目变得庞大时，使用类可以帮助你更好地组织代码，将相关的功能和数据放在一个命名空间下。
5. **复用代码**：类允许你创建可复用的对象模板，避免重复编写相同的代码。
6. **易于理解**：对于那些熟悉传统OOP语言的开发者，使用类可以使代码更易于理解和维护。

## 示例代码

> 假设我们要创建一个`Car`类，它有品牌、型号和颜色属性，以及一个描述汽车的方法。

```javascript
class Car{
    constructor(brand,model,clolr){
        this.brand = brand;
        this.model = model;
        this.color = color;
    }
    getDescription(){
        return `${this.brand} ${this.model} ${this.color}`
    }
}

// 创建Car的实例
const myCar = new Car('Toyota','Corolla','blue')
console.log(myCar.getDescription())
```

## 子类继承父类

在JavaScript中，你可以使用ES6的类语法来实现子类继承父类。下面是一个简单的示例，展示了如何创建一个父类`Animal`和一个子类`Dog`，其中`Dog`继承自`Animal`：

```javascript
// 定义父类 Animal
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound.`);
    }
}

// 定义子类 Dog 继承自 Animal
class Dog extends Animal {
    constructor(name, breed) {
        super(name); // 调用父类的构造函数
        this.breed = breed;
    }

    speak() {
        // 重写父类的方法
        console.log(`${this.name} barks.`);
    }

    fetchToy() {
        console.log(`${this.name} fetches the toy.`);
    }
}

// 创建 Dog 类的实例
const myDog = new Dog('Rover', 'Labrador');

// 调用继承自父类的方法
myDog.speak(); // 输出: Rover barks.
// 调用 Dog 类自己的方法
myDog.fetchToy(); // 输出: Rover fetches the toy.
```

在这个示例中：

- `Animal` 是父类，包含了一个`constructor`和一个`speak`方法。
- `Dog` 是子类，它扩展了`Animal`，并且有自己的构造函数和`speak`方法（覆盖了父类的同名方法），以及一个额外的`fetchToy`方法。

当你创建`Dog`的实例并调用其方法时，可以看到它不仅继承了父类的`speak`方法，而且还可以使用自己独有的方法。同时，`Dog`的`speak`方法覆盖了`Animal`的`speak`方法，这是多态性的一个体现。

## 类和函数

类是基于ES6引入的语法特性，用来封装一组属性和方法，而函数则可以被视为一个可执行的代码块，可以返回值或执行特定任务。

### 函数

函数在JavaScript中是非常通用的。它们可以作为值来传递、存储和返回，可以是匿名的或命名的。函数也可以作为构造函数使用，通过`new`关键字来创建对象实例。函数可以具有闭包能力，访问其定义时的作用域中的变量。

示例：

```javascript
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  console.log(`Hello, my name is ${this.name}`);
};
const person = new Person('John Doe');
person.greet();
```

### 类

类是ES6引入的新特性，提供了更接近传统面向对象编程语言的类和继承语法。类定义了一个对象的蓝图，包括其属性和方法。类中的方法默认是不可枚举的，类还支持静态方法、getter和setter等。

```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
  static sayHello() {
    console.log('Hello from the class!');
  }
}
const person = new Person('John Doe');
person.greet();
Person.sayHello();
```

### 类与函数的关系

- **继承和封装**：类更直观地支持继承和封装概念，使代码结构更清晰，易于理解和维护。
- **构造函数**：在ES5及之前，我们通常使用构造函数和原型链来模仿类的行为。ES6的类内部实际上是使用构造函数和原型链来实现的，但它提供了更简洁的语法。
- **函数与类的互换**：在某些场景下，类可以被函数所取代，反之亦然。例如，一个简单的类可以用一个构造函数来替代。但是，类提供的额外语法糖和面向对象的特性，如私有字段和方法，使得在复杂的对象模型中使用类更为方便。

### 结论

类并不能完全取代函数的所有功能，尤其是在函数式编程的场景下，函数仍然非常重要。然而，在面向对象编程的上下文中，类提供了一种更现代、更直观的方式来组织和管理代码。根据具体的应用场景和编程风格，可以选择使用函数、类或是两者的结合。

## 疑问

### class内部的this指向什么？

在JavaScript中，this指向当前类的实例。当你使用`new`关键字创建一个类的实例时，`this`在构造函数和实例方法中会绑定到新创建的对象。这意味着你可以在方法中使用`this`来访问和修改该对象的属性和方法。

示例：

```javascript
class MyClass {
  constructor(value) {
    this.value = value;
  }

  showValue() {
    console.log(this.value);
  }
}

const myInstance = new MyClass(42);
myInstance.showValue(); // 输出: 42
```

在这个例子中，`MyClass`有一个构造函数和一个`showValue`方法。当我们使用`new MyClass(42)`创建`myInstance`时，`this`在`constructor`和`showValue`方法中都指向了`myInstance`。因此，`this.value`就是`42`，并且`showValue`方法可以正确地输出这个值。

需要注意的是，`this`的绑定在JavaScript中是动态的，它的值取决于函数调用的方式。在类的静态方法中，`this`指的是类本身，而不是类的实例。

### 构造函数是用来做什么的？

在JavaScript中，类的构造函数（constructor）是一个特殊的方法，用于初始化类的新实例。当使用`new`关键字创建一个类的实例时，构造函数会被自动调用。它的主要目的是为新创建的对象设置初始状态，比如设置属性的默认值，或者执行一些初始化逻辑。

构造函数的基本语法如下：

```javascript
class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
    // 其他初始化逻辑...
  }
}
```

在这个例子中，`MyClass`有一个构造函数，它接受两个参数`param1`和`param2`。当创建`MyClass`的实例时，这两个参数会被传入构造函数，然后使用`this`关键字将它们赋值给实例的属性`property1`和`property2`。

下面是如何使用构造函数创建实例的示例：

```javascript
const myInstance = new MyClass('value1', 'value2');
console.log(myInstance.property1); // 输出: value1
console.log(myInstance.property2); // 输出: value2
```

构造函数还可以包含其他任何必要的初始化代码，比如调用其他方法、设置默认值、或者进行一些计算。它提供了一个集中化的位置来处理所有与创建新对象相关的工作，使得代码更清晰、更易于管理和维护。

值得注意的是，如果类中没有显式定义构造函数，JavaScript会自动提供一个默认的构造函数，该构造函数不会做任何事情，除了初始化`this`。但是，为了明确和更好的代码可读性，通常推荐显式地定义构造函数。

### 静态方法和实例方法有什么区别？

静态方法和实例方法在面向对象编程中扮演着不同的角色，它们的主要区别在于它们的关联性、调用方式、内存分配以及它们能够访问的资源。以下是静态方法和实例方法的一些关键区别：

1. **调用方式**:
   - **静态方法** 可以通过类名直接调用，无需创建类的实例。例如，在Java中，你可以使用 `ClassName.staticMethod()` 来调用静态方法。
   - **实例方法** 必须通过类的实例来调用。你需要首先创建一个类的实例，然后使用 `instanceReference.method()` 来调用实例方法。
2. **使用权限**:
   - **静态方法** 只能访问静态成员（即静态变量和其他静态方法），因为静态方法在类加载时就已经存在，与类的任何实例无关。
   - **实例方法** 可以访问类的所有成员，包括静态成员和非静态成员（实例变量和其他实例方法）。
3. **内存分配**:
   - **静态方法** 在类加载时就会分配内存，与类的实例无关。这意味着不管创建了多少个类的实例，静态方法在内存中只有一份拷贝。
   - **实例方法** 是随着类的实例创建而分配内存的。每次创建一个新的类实例，实例方法都会作为该实例的一部分存在，即使其实例方法的代码在内存中只有一份。
4. **对象依赖**:
   - **静态方法** 不依赖于任何特定的类实例，因此它们无法直接访问实例变量或实例方法。
   - **实例方法** 依赖于类的实例，可以访问和修改实例变量，以及调用其他实例方法。
5. **继承和重写**:
   - **静态方法** 不能被子类重写，因为它们与类本身相关联，而不是与类的实例相关联。
   - **实例方法** 可以被子类重写，允许子类改变或扩展父类的行为。
6. **使用场景**:
   - **静态方法** 通常用于实现工具方法或辅助功能，这些方法不依赖于类的状态。例如，数学运算、数据验证或工厂模式中的方法创建。
   - **实例方法** 通常用于实现类的业务逻辑，这些方法通常需要访问和操作类的实例状态。

### 什么情况下会用到静态方法？

在JavaScript中，静态方法是在类的上下文中定义的，它们并不属于类的实例。这意味着你可以在不创建类的实例的情况下直接调用静态方法。静态方法主要在以下几种情况下使用：

1. **工具方法**： 当你需要一个方法来执行与类相关但不依赖于任何特定实例状态的任务时，可以使用静态方法。这些通常是通用的、辅助性的功能，例如数据验证、格式化等。
2. **工厂方法**： 静态方法可以用来创建类的实例，这通常在工厂模式中使用。工厂方法可以封装复杂的创建逻辑，例如参数检查、缓存已创建的对象等。
3. **配置或常量**： 如果你想定义一些配置选项或者常量，静态属性和方法可以提供一个合适的位置。因为它们不依赖于实例状态，所以适合用于存储不变的数据。
4. **单例模式**： 虽然JavaScript中通常使用闭包来实现单例，但静态方法也可以用来控制类的实例化，确保只有单一实例存在。
5. **性能优化**： 静态方法在内存中只占用一个位置，因此如果方法不需要访问实例变量，使用静态方法可以节省内存资源。
6. **避免实例化**： 如果一个方法不依赖于实例的状态，那么就没有必要每次调用时都创建一个新的实例。静态方法允许直接调用，避免了不必要的实例化开销。

举例子：

> 例如，假设你有一个`MathUtils`类，你可以这样定义一个静态方法来计算两个数的最大公约数

```javascript
class MathUtils {
    static gcd(a, b) {
        if (!b) return a;
        return MathUtils.gcd(b, a % b);
    }
}

console.log(MathUtils.gcd(100, 20));  // 输出 20
```

在这个例子中，`gcd`方法是一个静态方法，它不需要访问任何实例变量，可以直接通过类名调用。

### 构造函数里面的super是什么意思？用法？

在JavaScript中，`super`关键字有几种不同的用途，主要是在类和继承的上下文中使用。当在子类的构造函数中使用`super`时，它用于调用父类（超类）的构造函数。这是面向对象编程中的一个关键概念，允许子类继承并可能扩展或修改父类的行为。

用法：

1. 调用父类构造函数：当你在一个派生类的构造函数中使用`super()`，你实际上是在调用基类的构造函数。这通常发生在子类构造函数的开始，并且必须在使用`this`关键字之前调用。这是因为`super()`会初始化从父类继承的属性和方法。

```javascript
class Parent {
    constructor() {
        this.value = 'parent';
    }
}

class Child extends Parent {
    constructor() {
        super(); // 调用Parent的构造函数
        this.value = 'child';
    }
}

const child = new Child();
console.log(child.value); // 输出 'child'
```

2. 调用父类的方法：在类的方法中，你可以使用`super.methodName()`来调用父类中相同名称的方法。

```javascript
class Parent {
    sayHello() {
        console.log('Hello from Parent');
    }
}

class Child extends Parent {
    sayHello() {
        super.sayHello(); // 调用Parent的sayHello方法
        console.log('Hello from Child');
    }
}

const child = new Child();
child.sayHello(); // 输出 'Hello from Parent' 和 'Hello from Child'
```

3. 访问父类的属性：类似地，在子类的方法中，你可以使用`super.propertyName`来访问或设置父类的属性。

```javascript
class Parent {
    constructor() {
        this.value = 'parent';
    }
}

class Child extends Parent {
    constructor() {
        super();
        console.log(super.value); // 输出 'parent'
    }
}

const child = new Child();
```

请注意，当你在子类的构造函数中使用`super`时，你不能省略它，即使父类没有定义构造函数。如果父类没有构造函数，你仍然需要调用`super()`，尽管在这种情况下不传递任何参数。

```javascript
class Parent {}

class Child extends Parent {
    constructor() {
        super(); // 即使Parent没有构造函数，也必须调用super()
    }
}
```

