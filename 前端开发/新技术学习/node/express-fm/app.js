const express = require('express')
const fs = require('fs')
const app = express()
app.use(express.urlencoded()) // x-www-form-urlencoded格式
app.use(express.json()) // json格式

const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

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
app.listen(3000,()=>{
    console.log('http://127.0.0.1:3000');
})