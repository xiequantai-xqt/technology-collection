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
    // 频道的封面
    cover:{
        type: String,
        default: null
    },
    // 频道的描述信息
    channeldes:{
        type: String,
        default: null
    },
    subscribeCount:{
        type: Number,
        default: 0
    },
    ...baseModel
})
module.exports = userSchema