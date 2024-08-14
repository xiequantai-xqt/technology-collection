# 什么是中间件

在Node.js中，中间件是一个函数，它有访问请求对象（req）、响应对象（res）以及应用程序请求-响应周期中的下一个中间件函数的能力。这个“下一个”中间件函数通常被命名为`next`。中间件的功能可以非常广泛，从执行代码到做出响应，再到将请求传递给位于它后面的其他中间件。

在Node.js的web框架中，如Express.js，中间件是非常核心的概念。一个典型的Express中间件看起来像这样：

```javascript
app.use(function(req, res, next) {
  console.log('Time:', Date.now())
  next() // pass control to the next middleware in line
})
```

在这个例子中，中间件只是记录了请求的时间戳，然后通过调用`next()`函数将控制权交给下一个中间件或路由处理器。

中间件可以用来做各种事情，比如：

1. **日志记录**：记录每个请求的时间、方法、URL等信息。
2. **解析请求体**：例如使用`body-parser`中间件来解析JSON或URL编码的数据。
3. **错误处理**：捕获错误并发送错误响应。
4. **身份验证**：检查用户是否已经登录或具有适当的权限。
5. **缓存**：缓存请求的结果以提高性能。
6. **压缩**：压缩响应数据以减少传输时间。
7. **静态文件服务**：发送静态文件，如图片、CSS和JavaScript文件。
8. **跨域资源共享（CORS）**：允许来自不同源的资源请求。

中间件可以串联起来，形成一个处理链，其中每个中间件都有机会修改请求或响应，或者结束响应。如果中间件不结束响应，它必须调用`next()`函数来将请求传递给下一个中间件。

在Express中，你可以使用`app.use()`注册中间件，而`app.get()`, `app.post()`等则可以注册特定HTTP方法的路由处理器，这些也可以看作是一种特殊的中间件。

注意：

1. 全局中间件需要放在所有的路由的前面（代码的位置很关键）

# express中间件的分类

1. 应用程序级别中间件
2. 路由级别中间件
3. 错误处理中间件
4. 内置中间件
5. 第三方中间件

## 应用程序级别中间件

```javascript
app.use((req,res,next)=>{
    
})
```

## 路由级别中间件

> 方式一

```javascript
app.get('/user',(req,res,next)=>{
    
})
```

> 方式二

```javascript
// 语法
app.get('router',fun1,fun2)
// 例子
app.get('/user',(req,res,next)=>{
    console.log(req.method)
    next()
},function(req,res,next){
    res.send('666')
})
```

在这个路由里，执行完前面的next()方法，就会开始执行fun2函数的语句。

> 方式三：将路由封装成一个文件，然后导入到app中

> router.js

```javascript
const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    console.log(req.method)
    res.send('/index')
})
router.get('/users',(req,res)=>{
    console.log(req.method)
    res.send('/users')
})

module.exports = router
```

> app.js

```javascript
const express = require('express')
const router = require('./router')

const app = express()
app.use(router) // 应用级别的路由挂载
```



也可以加入路由前缀，所有的路由都必须加上“/user”

```javascript
app.use('/user',router) // 应用级别的路由挂载
```

## 错误处理中间件

> app.js

```javascript
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send('service Error')
})
```

## 内置中间件

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/a5bb383e-2d42-4796-a456-6204fe934821.png)

打开express官方文档，例如`express.json([options])`就是内置中间件。

## 第三方中间件

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/118dec1b-315b-4fc5-a82f-d38db6e9d345.png)

打开express官方文档，“资源 => 中间件”，注意，最好不要用中文文档，不全。

# express路由与响应方法

## 匹配所有的请求方法

```javascript
app.all('/xx',(req,res)=>{
    res.send('xxx')
})
```

## 匹配路径

> 路径支持正则表达式的写法

1. 路径中间加上问号（？）：问号表示问号后面的字母是可选的。这个例子e是可选的，/usr是可以被匹配的。

```javascript
app.get('us?er',(req,res)=>{
    res.send(`${req.method}---${req.url}`)
})
```

2. 路由中间加上加号（+）：可以让加号前面的字母，再写多个。这个例子，`/usssssssser`是可以被匹配的。

```javascript
app.get('us+er',(req,res)=>{
    res.send(`${req.method}---${req.url}`)
})
```

3. 路由中间加上星号（*）：星号代表通配符，什么都可以加，但也可以不加。

```javascript
app.get('us*er',(req,res)=>{
    res.send(`${req.method}---${req.url}`)
})
```

## 获取路径的参数

```javascript
app.get('/user/:id',(req,res)=>{
    console.log(req.params)
    res.send(`${req.method}----${req.url}`)
})
```

## 路由的链式调用

```javascript
app
.get('/user',(req,res)=>{
    
}).post('/video',(req,res)=>{
    
})
```

返回方法的说明：

1. `res.send()`
2. `res.download()`：返回给客户端是可下载的
3. `res.end()`：和原生Node返回是一样的
4. `res.json()`：返回json格式数据
5. `res.sendStatus()`：将状态码和数据一并返回给客户端

# 项目基本设施搭建

## 跨域

```shell
# 跨域 cors
npm i cors
```

```javascript
/**
 * 跨域
 */
var express = require('express');
const cors = require('cors')
var app = express();
app.use(cors)
```

## 日志记录

```shell
# 日志记录 morgan
npm i morgan
```

```javascript
var express = require('express');
var logger = require('morgan');
app.use(logger('dev'));// 在开发环境下记录运行日志
```

## 项目目录

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/b2bc4314-b300-4588-899e-ba2138fd87ef.png)

### 根文件

> app.js

```javascript
const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(logger('dev'))

app.use('/api/v1',require('./router/index'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running at http://127.0.0.1:${PORT}api/v1/`)
})
```

### 路由

> router/index.js

```javascript
const express = require('express')
const router = express.Router()

router.use('/video',require('./video'))
router.use('/user',require('./user'))

module.exports = router
```

> router/user.js

```javascript
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.get('/users',userController.list)
module.exports = router
```

> router/video.js

```javascript
const express = require('express')
const router = express.Router()

router.get('/list',(req,res)=>{
    console.log(req.method)
    res.send('/video-list')
})
module.exports = router
```

### 业务逻辑层

> controller/userController.js

```javascript
exports.list = async(req,res)=>{
    console.log(req.method)
    res.send('/user-list')
}
```

# 用户注册

> 数据处理模块-mongoose

## 配置路由、基本业务层

> router/user.js

```javascript
const userController = require('../controller/userController')

router.post('/register',userController.register)
```

> controller/userController.js

```javascript
exports.register = async(req,res)=>{
    console.log(req.body)
    res.send('用户注册')
}
```

## 了解mongoose库

mongoose是基于MongoDB在node.js下的二次封装。

demo：

```javascript
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

// 创建集合，集合的名称是Cat
const Cat = mongoose.model('Cat', { name: String });

// 设置数据
const kitty = new Cat({ name: 'Zildjian' });
// 保存数据
kitty.save().then(() => console.log('meow'));
```

## 使用mongoose操作MongoDB数据库

> 安装mongoose

```shell
npm i mongoose
```

> model/index.js

```javascript
// 0.先要连接MongoDB的数据库
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/mytest');
}
main().then(res=>{
    console.log('mogo连接成功')
}).catch(error=>{
    console.log(`mogo连接失败,${error}`)
})
// 1.定义、创建集合
const user = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
})
const userModel = mongoose.model('ModelName',user)
// 2.设置数据
const u = new userModel({
    username:'李四',
    age: 28
})
// 3.存储数据
u.save()
```

说明：

1. `mongoose.model('ModelName',user)`，第一个参数代表  **集合的名字**  ，第二个参数代表  **定义好的数据格式**  ；
2. 先设置数据，然后存储数据；

## 数据入库

> 模块化拆分

> model/userModel.js

```javascript
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    createAt:{
        type:Date,
        default:Date.now
    },
    updateAt:{
        type:Date,
        default:Date.now
    }
})
module.exports = userSchema
```

> model/index.js

```javascript
const mongoose = require('mongoose');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/express-video');
}
main().then(res=>{
    console.log('mogo连接成功')
}).catch(error=>{
    console.log(`mogo连接失败,${error}`)
})

// 模型导出
module.exports = {
    User: mongoose.model('User',require('./userModel'))
}
```

> controller/userController.js

```javascript
const { User } = require('../model/index')

exports.register = async(req,res)=>{
    console.log(req.body)
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    res.status(201).json(dbBack)
}
```

## 密码加密

> 这里采用MD5加密的方式

MD5（Message-Digest Algorithm 5）是一种广泛使用的密码散列函数，它可以将任意长度的数据转换成一个固定长度（通常是128位或16字节）的十六进制数字串。在数据库中，MD5经常被用来对敏感数据如用户密码进行加密存储，以保护数据的安全性。

> 加密：utils/md5.js

```javascript
/**
 * 在 JavaScript 中，尤其是在 Node.js 环境下，crypto 模块是内置的，用于处理加密相关操作，如哈希、签名、验证、加密和解密等。
 */
const crypto = require('crypto')

module.exports = str =>{
    return crypto
            .createHash('md5')
            .update('xiexie',str)
            .digest('hex')
}
```

> model/userModel.js：新建模型时候引入md5

```javascript
const mongoose = require('mongoose')
const md5 = require('../utils/md5')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set: str=>md5(str)
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    createAt:{
        type:Date,
        default:Date.now()
    },
    updateAt:{
        type:Date,
        default:Date.now()
    }
})
module.exports = userSchema
```

> controller/userController.js：逻辑处理模块，客户端不能返回密码

```javascript
const { User } = require('../model/index')
exports.register = async(req,res)=>{
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    let user = dbBack.toJSON()
    delete user.password
    res.status(201).json({ user })
}
```

## 数据校验

> 官网地址：https://express-validator.github.io/docs/

### 基本使用

> 使用express-validator

```shell
npm install express-validator
```

> router/user.js

```javascript
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { body,validationResult  } = require('express-validator')

router
.post('/register',
body('username')
    .notEmpty().withMessage('用户名不能为空')
    .isLength({min:3}).withMessage('用户名长度不能小于3'),
(req,res,next)=>{
    const errors = validationResult(req)
    console.log(errors)
},
userController.register)

module.exports = router
```

### 模块化拆分

> **接下来对数据验证进行模块化拆分：**

> middleware/validator/userValidator.js

```javascript
const { body,validationResult  } = require('express-validator')

module.exports.register = [
    body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({min:3}).withMessage('用户名长度不能小于3'),
    body('email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式')
]
```

> router/user.js

```javascript
const { body,validationResult  } = require('express-validator')
const validator = require('../middleware/validator/userValidator')

router
.post('/register',
...validator.register,
(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty())
    return res.status(401).json({error:errors.array()})
    next()
},
userController.register)
```

### 对所有的路由错误处理统一处理

> 官网上的demo

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/ce3f7fad-9af4-466d-b40f-b3e5e4834059.png)

> middleware/validator/errorBack.js

```javascript
const { validationResult } = require('express-validator');

// can be reused by many routes
const validate = validations => {
  return async (req, res, next) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    next();
  };
};
module.exports = validate
```

> middleware/validator/userValidator.js

```javascript
const { body,validationResult  } = require('express-validator')
const validate = require('./errorBack')

module.exports.register = validate([
    body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({min:3}).withMessage('用户名长度不能小于3'),
    body('email')
    .notEmpty().withMessage('邮箱不能为空')
    .isEmail().withMessage('邮箱格式')
])
```

> router/user.js

```javascript
const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')

router.post('/register',validator.register,userController.register)

module.exports = router
```

### 针对项目，进行数据校验

> 根据前面对数据校验的介绍，针对项目，进行数据校验

> middleware/validator/userValidator.js

```javascript
const { body,validationResult  } = require('express-validator')
const validate = require('./errorBack')

const { User } = require('../../model/index')

module.exports.register = validate([
    body('username')
    .notEmpty().withMessage('用户名不能为空').bail()
    .isLength({min:3}).withMessage('用户名长度不能小于3').bail(),
    
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail()
    .custom(async val=>{
        const emailValidate = await User.findOne({email:val})
        if(emailValidate)
        return Promise.reject('邮箱已被注册')
    }),
    
    body('phone')
    .notEmpty().withMessage('手机号不能为空').bail()
    .custom(async val=>{
        const phoneValidate = await User.findOne({phone:val})
        if(phoneValidate)
        return Promise.reject('手机号已被注册')
    })
])
```

说明：

1. 用户名不能少于3位
2. 邮箱格式、邮箱唯一性（custom自定义校验）
3. 手机号唯一性

# 用户登录

步骤：

1. 客户端数据验证
2. 连接数据库查询

> 路由设置：router/user.js

```javascript
const userController = require('../controller/userController')
const validator = require('../middleware/validator/userValidator')

router.post('/login',validator.login,userController.login)
```

> 校验：middleware/validator/userValidator.js

```javascript
const { body,validationResult  } = require('express-validator')
const validate = require('./errorBack')

const { User } = require('../../model/index')

module.exports.login = validate([
    body('email')
    .notEmpty().withMessage('邮箱不能为空').bail()
    .isEmail().withMessage('邮箱格式不正确').bail(),
    body('password')
    .notEmpty().withMessage('密码不能为空').bail()
])
```

> 业务逻辑：controller/userController.js

```javascript
const { User } = require('../model/index')

exports.login = async(req,res)=>{
    const dbBack = await User.findOne(req.body)
    res.status(200).json(dbBack)
}

```

> 数据模型修改：model/userModel.js

```javascript
const mongoose = require('mongoose')
const md5 = require('../utils/md5')
const baseModel = require('./baseModel')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        set: str=>md5(str),// 设置
        select: false// 过滤，决定是否返回给客户端
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: null
    },
    ...baseModel
})
module.exports = userSchema
```

# JWT用户身份认证

> 使用JWT的库是jsonwebtoken

安装：

```shell
npm install jsonwebtoken
```

语法结构：

```javascript
jwt.sign(payload, secretOrPrivateKey, [options, callback]) // 加密

jwt.verify(token, secretOrPublicKey, [options, callback]) // 解密
```

demo：

```javascript
const jwt = require('jsonwebtoken')

// 加密
const token = jwt.sign({foo:'hello word!'},'555')
console.log(token)
// 验证
const text = jwt.verify(token,'555')
console.log(text)
```

打印结果：

> iat表示token有效的时间戳

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/270dd1ac-23d9-4324-93ec-16f7d29e8441.png)

# 用户登录认证与接口鉴权

## 封装jwt加密的方法

> 注意：jwt.sign是异步的，所以需要promisify包装一下

> utils/jwt.js

```javascript
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)

// 加密
module.exports.createToken = async userinfo=>{
    await tojwt({userinfo},'81bcc3d5-63ad-4600-a5c4-562b12d6ed15',{expiresIn: 60*60})
}
```

参数说明：

- 第二个参数用的是uuid，最好是自己记不住的key
- 第三个参数，过期时间是以秒为单位的

## 验证token

业务逻辑：

1. 对于有些路由我需要客户端给我传入token
2. 如果有token，就将token取出来。如果没有token，就提醒客户端传入token。
3. 如果token失效，也要提醒客户端传入有效的token。

> utils/jwt.js

```javascript
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verfiy = promisify(jwt.verify)
const { uuid } = require('../config/config.default')

// 验证token
/**
 * 给路由提供中间件
 */
module.exports.verfiyToken = async(req,res,next)=>{
    console.log(req.headers)
    let token = req.headers.authorization
    token = token?req.headers.authorization.split('Bearer ')[1]:null
    if(!token)
    res.status(402).json({error:'请传入token'})
    try {
        let userinfo = await verfiy(token,uuid)
        req.user = userinfo
        next()
    } catch (error) {
        res.status(402).json({error:'无效token'})
    }
}
```

> router/user.js

```javascript
const { verfiyToken } = require('../utils/jwt')

router.get('/list',verfiyToken,userController.list)
```

> 简单的业务逻辑：controller/userController.js

```javascript
exports.list = async(req,res)=>{
    console.log(req.user)
    res.send('/user-list')
}
```

> config/config.default.js

```javascript
module.exports.uuid = '071b265d-45b2-4ca1-ba90-90acdc6b322c'
```

