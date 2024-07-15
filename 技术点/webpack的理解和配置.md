# 项目构建

1. 初始化项目

- 创建一个新的文件夹作为项目根目录。
- 打开终端，进入项目目录，运行 `npm init` 来创建一个 `package.json` 文件，或者直接使用 `npm init -y` 快速初始化。

2. 安装 Webpack 和 Webpack CLI

```shell
npm install webpack webpack-cli
```

3. 设置项目目录结构

- 通常，项目结构可能包括：
  - `src` 目录：存放源代码。
  - `dist` 目录：存放构建后的输出文件。
  - `node_modules` 目录：存放项目依赖。
  - `package.json` 文件：包含项目元数据和依赖。
  - `webpack.config.js` 文件：Webpack 的配置文件。

4. 编写 Webpack 配置文件 webpack.config.js

在项目根目录下创建 `webpack.config.js` 文件，这个文件用于定义 Webpack 如何处理和打包你的代码。基本的配置可能如下所示：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js', // 入口文件
  output: {
    filename: 'main.js', // 输出文件名
    path: path.resolve(__dirname, 'dist'), // 输出目录
  },
  module: {
    rules: [
      // 添加 loader 规则
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: { // 开发服务器配置
    static: path.join(__dirname, 'dist')
  },
};
```

解释：

- **`test`**: 这个属性用于定义一个正则表达式，Webpack会用这个正则表达式去匹配模块的请求路径。如果请求路径与正则表达式匹配，则该模块会被应用指定的loader进行处理。在这个例子中，`/.js$/`会匹配所有以`.js`结尾的文件。
- **`exclude`**: 这个属性同样使用正则表达式，但它的作用是排除某些不需要被loader处理的文件或目录。例如，`/node_modules/`将排除`node_modules`目录下的所有文件，避免对第三方库进行不必要的转换。
- **`use`**: 这个属性定义了当`test`条件满足时，应该使用哪些loader来处理模块。它接受一个loader对象或者一个loader对象的数组。在这个例子中，`'babel-loader'`被用来转换`.js`文件。`use`对象还可以包含`options`属性，用于传递配置选项给loader。

除了这些属性，`rules`对象还可能包含其他属性，如`include`（与`exclude`相反，用于指定应该包含的文件或目录）、`type`（定义模块的类型）等，具体取决于Webpack的版本和配置需求。

5. 配置 npm 脚本

在 `package.json` 文件中的 `scripts` 字段添加 npm 脚本来运行 Webpack：

```json
"scripts": {
  "build": "webpack",
  "start": "webpack serve"
}
```

6. 构建项目

- 运行 `npm run build` 来构建项目，这将按照 `webpack.config.js` 中的配置生成 bundle 文件。
- 使用 `npm start` 可以启动开发服务器，实时预览构建结果。

# mode设置

Webpack 的 `mode` 配置选项用来指定构建的模式，它会影响最终构建的优化方式和资源的生成。你可以设置 `mode` 为 `'development'` 或者 `'production'`。如果你不设置 `mode`，Webpack 默认使用 `'production'` 模式。

```javascript
module.exports = {
  //...
  mode: 'development', // 或者 'production'
  //...
};
```

当你设置 `mode` 为 `'development'` 时，Webpack 将启用一些有助于开发的功能，比如：

- 将 `process.env.NODE_ENV` 的值设置为 `'development'`。
- 启用模块热替换 (Hot Module Replacement)，如果使用了 `webpack-dev-server`。
- 不进行代码最小化，使代码更易于阅读和调试。
- 提供更详细的错误堆栈和警告信息。

而当你设置 `mode` 为 `'production'` 时，Webpack 会：

- 将 `process.env.NODE_ENV` 的值设置为 `'production'`。
- 对输出的代码进行压缩和优化，以减少文件大小。
- 生成更小的 bundle 文件，提高加载速度。
- 删除无用的代码（dead code elimination）。

请注意，Webpack 从 v4 开始引入了 `mode` 配置，而在这之前，开发者需要手动添加各种插件和配置来实现类似的优化效果。

此外，你也可以通过命令行界面 (CLI) 来设置 `mode`：

```shell
webpack --mode development # 或者 webpack --mode production
```

当使用 `npm scripts` 或 `yarn scripts` 时，你可以直接在脚本命令中包含 `--mode` 参数：

```json
"scripts": {
  "build:dev": "webpack --mode development",
  "build:prod": "webpack --mode production"
}
```

# 模块打包

Webpack 是一个模块打包器，它能够处理复杂的项目结构，并将各个模块及其依赖项打包成一个或多个 bundle 文件。

模块打包的基本过程：

1. **解析入口起点**： Webpack 的构建过程从一个或多个入口点开始，这些入口点是在配置文件中定义的。Webpack 会读取这些入口文件并解析其中的模块依赖。
2. **构建依赖图谱**： Webpack 会递归地遍历从入口点开始的所有模块依赖，构建出一个依赖图谱。这个图谱包含了所有被引用的模块，包括 JavaScript 模块、样式表、图片、字体文件等。
3. **加载器（Loaders）**： 在解析模块时，Webpack 使用加载器来处理不同类型的资源。加载器是可配置的，可以处理如 CSS、Sass、TypeScript、Babel 转换等。加载器按照配置的顺序执行，通常从右到左。
4. **插件（Plugins）**： Webpack 插件可以用于执行范围更广的任务，比如代码分割、资源优化、生成 HTML 文件、清理输出目录等。插件在特定的钩子点被执行，可以修改编译过程的各个方面。
5. **代码分割（Code Splitting）**： Webpack 支持动态导入（`import()` 语法），这使得代码可以按需加载，从而实现懒加载和更小的初始 bundle 大小。代码分割可以通过配置实现自动或手动。
6. **优化与压缩**： 在生产模式下，Webpack 会对输出的代码进行优化和压缩，移除注释、缩短变量名、删除未使用的代码等，以减小文件体积。
7. **输出（Output）**： 最后，Webpack 将所有处理后的模块和资源输出到指定的目录，形成一个或多个 bundle 文件。这些文件包含了运行应用程序所需的所有代码和资源。
8. **模块联邦（Module Federation）**： 这是一个较新的特性，允许不同的 Webpack 构建之间共享模块，无需打包所有依赖到单个应用中，可以实现跨应用的模块共享和微前端架构。

示例：

```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 配置了 Babel 加载器来转换 ES6+ 代码
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // CSS 加载器来处理样式
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // 生成HTML代码
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development' // 或 'production'
};
```

# 代码压缩

在Webpack中配置代码压缩通常是在生产环境下进行的，以减小最终输出的bundle文件大小，提高加载速度。以下是一些常见的代码压缩配置方式，分别针对JavaScript、CSS和HTML：

## JavaScript压缩

对于JavaScript压缩，你可以使用 `terser-webpack-plugin`。首先需要安装此插件：

```shell
npm install --save-dev terser-webpack-plugin
```

然后在你的 `webpack.config.js` 配置文件中添加以下内容：

```javascript
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 可选，是否保留注释
        terserOptions: {
          compress: {
            drop_console: true, // 可选，是否移除 console.log 等调试代码
            warnings: false     // 可选，是否显示警告信息
          }
        }
      })
    ]
  },
  // ...
};
```

## CSS 压缩

CSS 压缩可以使用 `css-minimizer-webpack-plugin`。首先安装：

```shell
npm install --save-dev css-minimizer-webpack-plugin
```

然后在 `webpack.config.js` 中配置：

```javascript
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(), // 如果你已经配置了 JS 压缩
      new CssMinimizerPlugin()
    ]
  },
  // ...
};
```

## HTML 压缩

HTML 压缩可以使用 `html-webpack-plugin`，但是该插件本身不包含压缩功能，所以通常我们会结合 `html-minifier-terser` 来实现。首先安装：

```shell
npm install --save-dev html-webpack-plugin html-minifier-terser
```

然后在 `webpack.config.js` 中配置：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minifier-terser');

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true, // 合并空格
        removeComments: true,     // 移除注释
        removeRedundantAttributes: true, // 移除多余的属性
        useShortDoctype: true,    // 使用简短的文档类型声明
        removeEmptyAttributes: true, // 移除空属性
        removeStyleLinkTypeAttributes: true, // 移除 style 和 link 的 type 属性
        keepClosingSlash: true,   // 保持自闭合标签的斜杠
        minifyJS: true,           // 压缩内联 JS
        minifyCSS: true           // 压缩内联 CSS
      },
      template: './src/index.html'
    }),
    // 其他插件...
  ],
  // ...
};
```

请注意，在 `optimization.minimize` 设置为 `true` 时，Webpack 会自动应用你配置的 `minimizer`。确保在生产环境中设置 `mode` 为 `'production'`，这样Webpack会自动开启一些默认的优化和压缩选项。

```javascript
module.exports = {
  // ...
  mode: 'production',
  // ...
};
```

# 代码优化

## 代码分割（Code Splitting）

利用动态导入 (`import()`) 或者 `splitChunks` 插件来分割代码，只加载用户真正需要的部分。

```javascript
optimization: {
  splitChunks: {
    chunks: 'all',
    minSize: 20000,
    maxSize: 0,
    minChunks: 1,
    maxAsyncRequests: 10,
    maxInitialRequests: 5,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        priority: -10
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true
      }
    }
  }
}
```

## 使用Tree Shaking

确保你的代码是ES6模块化的，这样Webpack可以去除未使用的代码。

```javascript
// 使用export和import语句
export const myFunction = () => {};
```

## 压缩和优化

使用 TerserWebpackPlugin 来压缩JavaScript，使用 CssMinimizerWebpackPlugin 来压缩CSS。

```javascript
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin()
    ]
  }
};
```

## 使用缓存

为了加速开发阶段的构建速度，可以使用缓存加载器，如 `babel-loader` 的 `cacheDirectory` 选项。

```javascript
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
}
```

## 懒加载

对于大型应用，可以使用React的 `React.lazy` 和 `Suspense` 来实现懒加载组件。

```javascript
const MyLazyComponent = React.lazy(() => import('./MyComponent'));
```

## 提取公共代码

使用 `SplitChunksPlugin` 提取重复使用的代码到单独的文件。

## 图片和文件优化

使用 `url-loader` 或 `file-loader` 来处理图片和文件，并考虑使用 `image-webpack-loader` 来进一步压缩图片。

```javascript
{
  test: /\.(png|jpe?g|gif|svg)$/,
  use: [
    'file-loader',
    {
      loader: 'image-webpack-loader',
      options: {
        mozjpeg: {
          progressive: true,
        },
        optipng: {
          enabled: false,
        },
      },
    },
  ],
}
```

## 避免使用eval

在开发模式下，Webpack使用eval来加快编译速度，但在生产模式下，应该避免使用eval，因为它可能导致安全问题和性能下降。

## 使用DllPlugin和DllReferencePlugin

预编译第三方库，避免每次构建都重新编译。

## 使用Webpack Bundle Analyzer

分析你的bundle，找出可以优化的地方。

```shell
# 安装
npm install --save-dev webpack-bundle-analyzer
```

```javascript
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

## 配置DevServer

对于开发环境，合理配置 `devServer` 可以提高开发体验，例如开启HMR（Hot Module Replacement）。

```javascript
devServer: {
  hot: true,
  compress: true,
  port: 8080,
  open: true
}
```

## 持续集成/持续部署（CI/CD）

在CI/CD流程中使用Webpack，确保每次部署前都进行了完整的构建和测试。

# 性能优化

主要分为两大类：构建优化（开发体验和效率）和线上性能优化（用户加载体验）。

## 构建优化（开发体验和效率）

1. **加载器（Loaders）优化**：
   - 减少加载器的数量和复杂性。
   - 使用缓存加载器，如 `cache-loader`，以加快构建速度。
   - 配置加载器的 `parallel` 或 `concurrency` 选项，以并行处理文件。
2. **插件（Plugins）选择**：
   - 仅在生产环境中使用那些对构建速度有负面影响的插件。
   - 选择高效的插件版本。
3. **排除不必要的模块**：
   - 使用 `exclude` 选项来避免对 node_modules 中的代码进行转换，除非绝对必要。
   - 利用 `resolve.alias` 或 `resolve.modules` 来优化模块解析路径。
4. **多进程构建**：
   - 使用 `happypack` 或 `thread-loader` 来并行执行加载器任务。
5. **持久化缓存**：
   - 使用 `cacheDirectory` 或 `cacheCompression` 选项来缓存加载器的中间结果。
6. **优化 DevServer**：
   - 使用 `hot` 和 `inline` 选项启用热模块替换（HMR）。
   - 限制 `devServer` 的 `contentBase` 以减少不必要的文件读取。
   - 适当调整 `devServer` 的 `watchOptions`。
7. **减少文件系统访问**：
   - 使用内存文件系统（如 `memory-fs`）来减少磁盘 I/O。

## 线上性能优化（用户加载体验）

1. **代码分割（Code Splitting）**：
   - 使用动态导入 (`import()`) 和 `splitChunks` 插件来按需加载代码。
   - 分离 vendor 代码和应用代码，避免每次更新都下载整个 bundle。
2. **Tree Shaking**：
   - 确保你的代码是模块化的（使用 `import` 和 `export`），以便 Webpack 可以移除未使用的代码。
3. **资源压缩**：
   - 使用 `TerserWebpackPlugin` 或 `UglifyJsPlugin` 来压缩 JavaScript。
   - 使用 `css-minimizer-webpack-plugin` 来压缩 CSS。
   - 使用 `html-minifier-terser` 来压缩 HTML。
   - 压缩和优化图像和字体文件。
4. **文件名哈希**：
   - 使用 `[hash]` 或 `[chunkhash]` 在文件名中添加哈希值，以实现缓存控制和避免浏览器缓存过期。
5. **资源懒加载**：
   - 使用 React 的 `React.lazy` 和 `Suspense` 或 Vue 的异步组件来实现资源的懒加载。
6. **CDN 和外部资源**：
   - 利用 CDN 来托管静态资源，如 vendor 库。
   - 异步加载非关键资源。
7. **分析工具**：
   - 使用 `webpack-bundle-analyzer` 来分析 bundle 的组成，找出可以进一步优化的地方。
8. **减少网络请求**：
   - 使用 Webpack 的 `externals` 配置来避免将某些库打包进 bundle，而是通过 CDN 提供。
9. **缓存策略**：
   - 为静态资源设置适当的 HTTP 缓存头。
10. **使用 DLLs**：
    - 预编译第三方库，使用 `DLLPlugin` 和 `DLLReferencePlugin`，以避免每次构建时重复编译相同的代码。
