# 使用node创建http服务器

步骤：

1. 创建http服务器
2. 服务器接收请求，并且处理请求
3. 响应处理结果，并且断开链接

# 使用原生的node基础demo

> server.js

```javascript
// 1.导入http模块
var http = require('http')
// 2.创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080,function(){
    console.log('http://127.0.0.1:8080');
})

// 监听客户端请求事件
server.on('request',function(req,res){
    console.log('监听请求');
    res.write('响应数据')// 响应客户端的数据
    res.end()// 断开链接
})

```

帮助开发者完成自动服务器重启的工具**nodemon**

```shell
npm install -g nodemon
```

# 服务器响应不同的数据类型

如果响应中文，默认情况下是乱码的（浏览器无法解析），设置请求头可以解决这类问题。

中文：

```javascript
res.setHeader('Content-type','text/plain;charset=utf-8')
```

html：

```javascript
res.setHeader('Content-type','text/html;charset=utf-8')
```

如果是读取外部的html文件：

```javascript
// 1.导入http模块
var http = require('http')
var fs = require('fs')
// 2.创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080,function(){
    console.log('http://127.0.0.1:8080');
})

// 监听客户端请求事件
server.on('request',function(req,res){
    fs.readFile('./http-server/index.html','utf-8',function(err,data){
        res.write(data)
        res.end()
    })
})

```

# 处理客户端不同的请求方式

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/3b9619ed-188e-4232-93b4-0f4b90bd9520.png)

```javascript
// 1.导入http模块
var http = require('http')
var fs = require('fs')
// 2.创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080,function(){
    console.log('http://127.0.0.1:8080');
})

// 监听客户端请求事件
server.on('request',function(req,res){
    if(req.method == 'GET'){
        fs.readFile('./http-server/index.html','utf-8',function(err,data){
            res.write(data)
            res.end()
        })
    }
})
```

# 处理post请求的消息数据

> get请求的数据传参是在请求行中，因此可以通过req.url获取到。post请求接收的数据是在请求体中，它的数据类型是Buffer数据，需要借助net模块的“data事件”和“end事件”获取到数据。

```javascript
var data = ''
req.on('data',function(d){
    data += d
})
req.on('end',function(){
    // 转译处理
    var dealedData = require('querystring').parse(data)
    console.log(dealedData)
})
res.end()
```

