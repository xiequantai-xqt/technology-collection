const mongoose = require('mongoose')
const baseModel = require('./baseModel')

const subscribeSchema = new mongoose.Schema({
    ...baseModel,
    // 这个用户
    user:{
        type: String,
        required: true,
        ref: 'User'
    },
    // 这个用户关注了谁
    channel:{
        type: String,
        required: true,
        ref: 'User'
    }
})

module.exports = subscribeSchema