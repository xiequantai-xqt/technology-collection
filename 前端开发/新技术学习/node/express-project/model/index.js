const mongoose = require('mongoose');
const { mongopath } = require('../config/config.default')
async function main(){
    await mongoose.connect(mongopath);
}
main().then(res=>{
    console.log('mogo连接成功')
}).catch(error=>{
    console.log(`mogo连接失败,${error}`)
})
// // 1.定义、创建集合
// const user = new mongoose.Schema({
//     username:{
//         type: String,
//         required: true
//     },
//     age:{
//         type: Number,
//         required: true
//     }
// })
// const userModel = mongoose.model('ModelName',user)
// // 2.设置数据
// const u = new userModel({
//     username:'李四',
//     age: 28
// })
// // 3.存储数据
// u.save()

// 模型导出
module.exports = {
    User: mongoose.model('User',require('./userModel')),
    Video: mongoose.model('Video',require('./videoModel')),
    Subscribe: mongoose.model('Subscribe',require('./subscribeModel')),
    Videocomment: mongoose.model('Videocomment',require('./videocommentModel')),
    VideoLike: mongoose.model('VideoLike',require('./videoLikeModel'))
}