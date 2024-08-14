# express适合做什么？

1. 传统web网站
2. API接口服务器
3. 服务端渲染中间层
4. 开发辅助工具，例如webpack-dev-server
5. 自定义集成框架

下载express脚手架工具：

1. 首先创建一个空的文件夹
2. 在这个文件夹下执行`npx express-generator`

# express的基本使用

```javascript
const express = require('express')
const app = express()

app.get('/',(req,res)=>{

})
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})
```

# Express管理用户数据信息

准备本地数据：

> db.json

```json
{
    "users":[
        {
            "id": 1,
            "username": "Monica",
            "age": 18
        },
        {
            "id": 2,
            "username": "卡卡",
            "age": 12
        }
    ],
    "video":[]
}
```

返回文档中users数据全部返回：

> app.js

```javascript
const express = require('express')
const fs = require('fs')
const app = express()

// 返回文档中users数据全部返回
app.get('/',(req,res)=>{
    fs.readFile('./db.json','utf-8',(err,data)=>{
        if(!err){
            const back = JSON.parse(data)
            res.send(back.users)
        }else{
            res.status(500).json({err})
        }
    })
})
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})
```

如果在比较复杂的业务中，回调函数中的逻辑可能会引发回掉地狱的问题。我们可以借助一个工具解决，原理是通过async/await。

> 修改之后

```javascript
const express = require('express')
const fs = require('fs')
const app = express()

const { promisify } = require('util')
const readFile = promisify(fs.readFile)

// 返回文档中users数据全部返回
app.get('/', async(req,res)=>{
    try {
        const back = await readFile('./db.json','utf-8')
        const jsonObj = JSON.parse(back)
        res.send(jsonObj.users)
    } catch (error) {
        res.status(500).json({error})
    }
})
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})
```

# 处理客户端 Post 请求数据

根据不同的post请求，服务端需要做处理。

![](https://front-end-files.oss-cn-shenzhen.aliyuncs.com/node%E5%AD%A6%E4%B9%A0/18fd1891-8630-4c00-9408-ecb9b8232920.png)

```javascript
app.use(express.urlencoded()) // x-www-form-urlencoded格式
app.use(express.json()) // json格式
```

# 添加用户信息

> app.js

```javascript
const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.json()) // json格式

const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// 添加用户到db文件
app.post('/',async(req,res)=>{
    let body = req.body
    if(!body){
        res.status(403).json({
            error:'缺少用户信息'
        })
    }
    const back = await readFile('./db.json','utf-8')
    const jsonObj = JSON.parse(back)
    body.id = jsonObj.users[jsonObj.users.length - 1].id + 1
    jsonObj.users.push(body)
    try {
        let w = await writeFile('./db.json',JSON.stringify(jsonObj))
        res.status(200).json({
            msg:'添加成功'
        })
    } catch (error) {
        res.status(500).json({error})
    }
    console.log(body);
})
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})
```

# 修改用户信息

> app.js

```javascript
// 修改用户信息
app.put('/:id',async(req,res)=>{
    // console.log(req.params.id);
    // console.log(req.body);
    if(!req.params.id){
        res.status(403).json({
            msg:'缺少用户id'
        })
    }
    try {
        const allUserInfo = JSON.parse(await readFile('./db.json','utf-8'))
        const userId = Number.parseInt(req.params.id)
        const userInfo = allUserInfo.users.find(item=>item.id == userId)
        if(!userInfo){
            res.status(403).json({
                msg:'id不存在'
            })
        }

        let body = req.body
        body.username? body.username:userInfo.username;
        body.age? body.age:userInfo.age;
        allUserInfo.users[userId - 1] = {
            ...allUserInfo.users[userId - 1],
            ...body
        }
        let w = await writeFile('./db.json',JSON.stringify(allUserInfo))
        if(!w)
        res.status(200).json({
            msg:'修改成功'
        })
    } catch (error) {
        res.status(500).json({error})
    }
})
```

