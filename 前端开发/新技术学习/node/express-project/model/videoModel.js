const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const videoSchema = new mongoose.Schema({
    ...baseModel,
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    vodvideoId:{
        type: String,
        required: true
    },
    // 记录是哪个用户上传的，和用户模型进行关联，记录用户的id
    user:{
        type: mongoose.ObjectId,
        required: true,
        ref:'User'
    },
    cover:{
        type: String,
        required: false
    },
    videocommentCount:{
        type: Number,
        default: 0
    },
    likeCount:{
        type:Number,
        default:0
    },
    dislikeCount:{
        type:Number,
        default:0
    }
})

module.exports = videoSchema