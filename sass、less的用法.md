# less

1. **语法与兼容性**: Less 是一种 CSS 的扩展语言，它使用类似于 CSS 的语法，因此对 CSS 开发者来说非常友好。Less 文件以 `.less` 扩展名保存，可以直接包含 CSS 代码，并在此基础上增加变量、嵌套规则、运算符、函数和混合等功能。
   - **变量**: 使用 `@` 符号定义变量，如 `@baseColor: #ffffff;`。
   - **嵌套**: 支持选择器嵌套，如 `.a { .b { ... } }`。
   - **混合 (Mixins)**: 可以创建可重用的代码块，可以带参数，如 `.rounded-corners(@radius: 5px) {...}`。
   - **运算符**: 支持数学运算，如 `width: (@baseWidth + 10px);`。
   - **函数**: 提供了一系列内置函数，也可以自定义函数。
2. **编译**: Less 可以在客户端（浏览器）或服务器端通过 JavaScript 编译成标准的 CSS 文件。客户端编译需要引入 Less.js 库，而服务器端编译则通常使用 Node.js 的 less 编译器。

## 高级用法

### 函数与运算

> Less 不仅支持基础的数学运算，还提供了多种内置函数，如色彩操作（调整亮度、对比度）、字符串操作等，可以用于创建复杂的动态样式。

```less
// 颜色混合示例
.mix-colors(@color1, @color2) {
  background-color: mix(@color1, @color2);
}

.box {
  .mix-colors(#ff0000, #00ff00);
}
```

### 命名空间与作用域

> 类似于编程语言，Less 支持作用域的概念，允许你通过命名空间来组织和隔离代码，避免样式冲突。

```less
.namespace {
  .box {
    color: blue;
  }
  
  .subnamespace {
    .text {
      font-size: 14px;
    }
  }
}

// 使用命名空间内的样式
body {
  .namespace > .box; // 引用.box样式
}
```

### 模式匹配

> 模式匹配允许你在定义混合时指定参数的类型或值，这样Less就可以根据传入的参数自动选择最合适的混合体执行。这种机制常用于处理不同类型的输入，如颜色、数值范围等。

```less
.mixin-pattern(@value) when (lightness(@value) >= 50%) {
  color: black;
}

.mixin-pattern(@value) when (lightness(@value) < 50%) {
  color: white;
}

.myElement {
  .mixin-pattern(#333);
  .mixin-pattern(#eee);
}
```

在这个例子中，`.mixin-pattern` 根据传入颜色的亮度自动选择文本颜色。当颜色亮度大于等于50%时，文本颜色为黑色；否则，文本颜色为白色。

### 守卫混合（Guarded Mixins）

> 守卫混合允许你在混合定义中添加逻辑条件，只有当这些条件满足时，混合才会被应用。这类似于编程语言中的“if”语句，提供了强大的逻辑控制能力。

```less
.border-mixin(@width, @style, @color) when (@width > 0) {
  border: @width @style @color;
}

.myBox {
  .border-mixin(2px, solid, #000); // 应用边框
}

.myDiv {
  .border-mixin(0, dashed, #f00); // 不应用边框，因为宽度为0
}
```

在这个例子中，`.border-mixin` 仅当指定的边框宽度大于0时才应用边框样式。因此，`.myBox` 元素会有边框，而 `.myDiv` 元素没有边框，因为它的边框宽度设为了0。

通过模式匹配和守卫混合，你可以使Less代码更加灵活和智能，能够根据不同的上下文条件产生不同的样式效果。

### 循环与迭代

> 在Less中，虽然不像Sass那样直接提供循环结构如`@for`、`@each`、`@while`，但你可以通过递归调用mixin结合守卫表达式来模拟循环结构。下面是一个模拟循环输出不同padding值的例子：

```less
.loop(@index, @max) when (@index <= @max) {
  .padding-@{index} {
    padding: (@index * 10px);
  }
  .loop(@index + 1, @max); // 递归调用自身，模拟下一次迭代
}

// 初始化调用，模拟循环开始
.loop(1, 5); // 输出从padding-1到padding-5，每个class的padding依次增加10px
```

这段代码定义了一个名为`.loop`的mixin，它接受两个参数：当前迭代次数`@index`和循环最大次数`@max`。通过守卫表达式`when (@index <= @max)`确保只有当`@index`小于等于`@max`时才执行mixin内的代码。在mixin内部，首先定义了一个带有当前迭代次数后缀的类（例如`.padding-1`），并设置了相应的padding值。然后，通过递归调用自身并增加`@index`的值来模拟下一次循环迭代，直到达到设定的最大迭代次数为止。

通过这种方式，你可以模拟出循环迭代的效果，在Less中生成一系列相似但有所变化的CSS规则。这种技术常用于创建一系列样式变体、响应式断点或是生成网格系统等场景。

# sass（scss）

1. **语法风格**: Sass 有两种语法风格，一种是较老的缩进式（Sass），另一种是 SCSS，后者与 CSS 语法几乎完全一致，是目前更常用的风格。SCSS 文件以 `.scss` 扩展名保存。
   - **变量**: 使用 `$` 符号定义，如 `$base-color: #ffffff;`。
   - **嵌套**: 同样支持嵌套规则，SCSS 样式使用 `{}` 和分号(`;`)，例如 `.a { .b { ... }; }`。
   - **混合 (Mixins)**: 使用 `@mixin` 定义，可以包含属性集或规则集，以及可选的参数，如 `@mixin rounded-corners($radius: 5px) {...}`。
   - **继承**: 通过 `@extend` 关键字实现选择器的继承。
   - **运算符**: 支持数学运算，如 `width: $base-width + 10px;`。
   - **控制指令**: 提供 `@if`, `@for`, `@each`, `@while` 等控制结构，增加了逻辑处理能力。
2. **编译与工具**: Sass 最初是基于 Ruby 的，但现在也有跨平台的 Dart Sass、LibSass（C/C++实现）等多种实现方式。通常，开发者会在开发环境中使用命令行工具或集成到构建系统（如 Gulp、Grunt 或 Webpack）中进行编译。

## 高级用法

### 条件语句

> Sass 支持 `@if`、`@else if`、`@else` 语句，可以根据条件决定是否应用某些样式，实现更复杂的逻辑控制。

```scss
@mixin responsive-text($breakpoint, $font-size) {
  @if $breakpoint == 'mobile' {
    font-size: $font-size * 0.9;
  } @else if $breakpoint == 'tablet' {
    font-size: $font-size;
  } @else {
    font-size: $font-size * 1.2;
  }
}

.text {
  @include responsive-text('tablet', 16px);
}
```

### 循环

> 使用 `@for`、`@each`、`@while` 等指令，可以轻松生成一系列相关的样式规则，比如创建一系列渐变色或响应式断点。

```scss
$colors: red, green, blue;

@for $i from 1 through length($colors) {
  .box-#{$i} {
    background-color: nth($colors, $i);
  }
}
```

### 占位符选择器%和 @extend

> 这是Sass特有的一个特性，允许创建一个不会直接输出到CSS的样式模板，仅通过 `@extend` 来调用，非常适合创建基类样式，避免无用CSS输出。

```scss
%clearfix {
  &::after {
    content: "";
    display: table;
    clear: both;
  }
}

.container {
  @extend %clearfix;
}
```

### 自定义函数

> Sass 支持创建自定义函数，不仅限于样式计算，还可以用于数据处理和逻辑判断，极大地增强了预处理能力。

```scss
@function em-to-px($em-value, $base-font-size: 16px) {
  @return $em-value * $base-font-size;
}

.body-text {
  font-size: em-to-px(1.5);
}
```

### 模块化与导入

在SCSS中，模块化主要通过以下几种方式实现：

1. **文件拆分**：将样式分散到多个文件中，每个文件代表一个模块或组件。
2. **变量文件**：通常创建一个包含全局变量的文件，比如颜色、字体大小、间距等，供其他文件引用。
3. **Mixins**：定义可重用的样式块，可以带参数，类似于函数。
4. **导入（@import）** 和 **@use**：用来导入其他SCSS文件到当前文件中，实现代码复用。

**导入（@import）**

> 传统的@import语句允许你将一个SCSS或SASS文件的内容包含到另一个文件中。但是，它不会创建独立的作用域，意味着所有变量、混合等内容都是全局共享的。

代码示例：

```scss
// _variables.scss
$primary-color: #1a1a1a;
$secondary-color: #f2f2f2;

// _buttons.scss
.button {
  color: $primary-color;
  background-color: $secondary-color;
}

// main.scss
@import 'variables';
@import 'buttons';

body {
  background: $primary-color;
}
```

@use (推荐)

> 从Sass 3.2开始引入了@use和@forward指令，它们提供了更先进的模块系统，允许文件之间共享变量、混合等内容的同时保持作用域隔离，避免了全局污染。

代码示例：

```scss
// _variables.scss
$primary-color: #1a1a1a;
$secondary-color: #f2f2f2;

// _buttons.scss
@use './variables' as *; // 使用*导入所有变量到当前作用域

.button {
  color: $primary-color;
  background-color: $secondary-color;
}

// main.scss
@use './variables' as vars;
@use './buttons';

body {
  background-color: vars.$primary-color;
}
```

在这个例子中，`@use`导入了`_variables.scss`并用别名`vars`来访问其中的变量，这有助于避免命名冲突，并使代码更加清晰。

注意事项：

- 文件名前的下划线（_）表明这是一个局部文件，通常不直接编译为CSS，而是通过导入机制使用。
- `@use`相较于`@import`提供了更好的封装和命名空间管理，推荐在新项目中使用。
- 在使用`@use`时，需要确保你的Sass版本支持这一特性。

### 内容插入 (@content)

> 在Sass中，`@content`指令提供了一种非常灵活的方式来插入代码块到混合器（mixins）或占位符选择器（%placeholders）中。它允许你定义一个结构或模板，并在使用时根据需要插入具体的样式内容。这种机制使得混合器或占位符变得更加通用，可以适应各种不同的场景，提高了代码的复用性和灵活性。

**基本用法**

**混合器中的 @content**

```scss
// 定义一个包含 @content 的混合器
@mixin box-shadow($x-offset, $y-offset, $blur-radius, $spread-radius, $color) {
  box-shadow: $x-offset $y-offset $blur-radius $spread-radius $color;
  
  @content;
}

// 使用混合器并插入自定义内容
.button {
  @include box-shadow(0, 2px, 4px, 0, rgba(0, 0, 0, 0.1));
  // 插入内容: 添加额外的阴影效果
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
}
```

在这个例子中，`.button` 使用了 `box-shadow` 混合器，并且在 `@content` 位置插入了额外的内阴影样式。

**占位符选择器中的 @content**

```scss
// 定义一个占位符选择器
%flex-container {
  display: flex;
  
  @content;
}

// 使用占位符并插入内容
.container {
  @extend %flex-container;
  // 插入内容: 设置特定的对齐方式
  justify-content: center;
  align-items: center;
}
```

这里，`%flex-container` 占位符定义了一些基础的 Flexbox 属性，而在 `.container` 中通过 `@extend` 继承了这些属性，并在 `@content` 处插入了对齐规则。

**优势**

1. 灵活性：@content 让你能在已有的结构中添加任意的CSS代码，不受混合器或占位符定义的限制。
2. 复用性：可以创建高度通用的混合器和占位符，适应多种设计需求。
3. 代码组织：有助于保持代码的整洁和模块化，便于维护和扩展。

总之，@content 是Sass中一个强大的特性，它允许开发者在定义好的框架内自由地插入和扩展样式，大大增强了CSS预处理器的表达能力和灵活性。

# 共同点

- **变量**: 两者都允许你定义变量来存储颜色、字体大小等值，提高代码的可维护性和一致性。
- **嵌套**: 都支持CSS选择器的嵌套，减少重复并增强代码的可读性。
- **运算符**: 都支持基本的数学运算，可以在样式中使用计算值。
- **混合与函数**: 提供了复用样式代码的方式，无论是Less的混合还是Sass的混合与函数，都能有效提升代码效率。

总的来说，Less 和 Sass (SCSS) 都是强大的 CSS 预处理器，旨在简化 CSS 的编写，提高开发效率和代码质量。选择哪一种取决于个人偏好、项目需求以及团队熟悉度。