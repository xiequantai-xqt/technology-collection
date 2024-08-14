const { User,Subscribe } = require('../model/index')
const { createToken } = require('../utils/jwt')
const fs = require('fs')
const { promisify } = require('util')
const rename = promisify(fs.rename)
const lodash = require('lodash')
const { log } = require('console')

exports.register = async(req,res)=>{
    const userModel = new User(req.body)
    const dbBack = await userModel.save()
    let user = dbBack.toJSON()
    delete user.password
    res.status(201).json({ user })
}
exports.login = async(req,res)=>{
    let dbBack = await User.findOne(req.body)
    if(!dbBack)
    res.status(403).json({error:'邮箱或者密码不正确'})
    dbBack = dbBack.toJSON()
    dbBack.token = await createToken(dbBack)
    res.status(200).json(dbBack)
}

exports.list = async(req,res)=>{
    console.log(req)
    res.send('/user-list')
}

// 用户修改
exports.update = async(req,res)=>{
    const id = req.user.userinfo._id
    const dbBack = await User.findByIdAndUpdate(id,req.body,{new:true})
    res.status(202).json({user:dbBack})
}
// 头像上传
exports.headImg = async(req,res)=>{
    const fileArr = req.file.originalname.split('.')
    const fileType = fileArr[fileArr.length - 1]
    try {
        await rename('./uploads/' + req.file.filename, './uploads/'+req.file.filename+'.'+fileType)
        res.status(202).json({filePath:req.file.filename+'.'+fileType})
    } catch (error) {
        res.status(500).json({err:'上传失败'})
    }
}
// 订阅
exports.subscribe = async(req,res)=>{
    const userId = req.user.userinfo._id
    const channelId = req.params.userId
    if(userId == channelId)
    res.status(401).json({err: '不能关注自己'})
    const record = await Subscribe.findOne({
        user: userId,
        channel: channelId
    })
    if(record){
        res.status(401).json({err:'已经订阅此频道'})
    }else{
        await new Subscribe({
            user: userId,
            channel: channelId
        }).save()
        const user = await User.findById(channelId)
        user.subscribeCount++
        user.save()
        res.status(200).json({msg:'订阅成功'})
    }
}
// 获取频道信息
exports.getuser = async(req,res)=>{
    let isSubscribe = false
    if(req.user){
        const record = await Subscribe.findOne({
            user: req.user.userinfo._id,
            channel: req.params.userId
        })
        if(record){
            isSubscribe = true
        }
    }
    const user = await User.findById(req.params.userId)
    res.status(200).json({...lodash.pick(user,['_id','username','image','cover','channeldes','subscribeCount','isSubscribe']),isSubscribe})
}
// 获取关注频道列表
exports.getSubscribeList = async(req,res)=>{
   let list = await Subscribe.find({
    user: req.params.userId
   }).populate('channel')
   list = list.map(item=>lodash.pick(item.channel,['_id','username','image','subscribeCount','cover','channeldes']))
   res.status(200).json({list})
}
// 获取粉丝列表
exports.getChannelList = async(req,res)=>{
   let list = await Subscribe.find({
    channel: req.user.userinfo._id
   }).populate('user')
   list = list.map(item=>lodash.pick(item.user,['_id','username','image','subscribeCount','cover','channeldes']))
   res.status(200).json({list})
}