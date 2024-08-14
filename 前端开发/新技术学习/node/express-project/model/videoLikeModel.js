const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videoLikeSchema = new mongoose.Schema({
    ...baseModel,
    // 哪个用户
    user:{
        type: mongoose.ObjectId,
        required:false,
        ref:'User'
    },
    // 哪个视频
    video:{
        type: mongoose.ObjectId,
        required: true,
        ref: 'Video'
    },
    // 喜欢或者不喜欢
    like:{
        type: Number,
        enum: [1,-1],
        required: true
    }
})
module.exports = videoLikeSchema