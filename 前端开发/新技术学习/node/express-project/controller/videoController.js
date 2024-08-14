const { Video,Videocomment,VideoLike } = require('../model/index')

exports.createVideo = async(req,res)=>{
    let body = req.body
    body.user = req.user.userinfo._id
    const videoModel = new Video(body)
    const dbBack = await videoModel.save()
    res.send(dbBack)
}
exports.getVideoList = async(req,res)=>{
    const { pageNum=1,pageSize=10 } = req.body
    const getVideo = await Video.find()
        .skip((pageNum-1)*pageSize).limit(pageSize) // 分页
        .populate('user','_id username cover') // 联表查询，将user表的信息查出来
    // 查询总条数
    const getVideoCount = await Video.countDocuments()
    res.send({list:getVideo,total:getVideoCount})
}
exports.getVideoDetail = async(req,res)=>{
    const { videoId } =req.params
    let videoInfo = await Video.findById(videoId).populate('user','_id username cover')
    res.status(200).json({msg:videoInfo})
}
// 添加视频评论
exports.videoComment = async(req,res)=>{
    const { videoId } = req.params
    const videoRecord = await Video.findById(videoId)
    if(!videoRecord){
        res.status(401).json({error:'视频不存在'})
    }
    const videoComment = await new Videocomment({
        content: req.body.content,
        user: req.user.userinfo._id,
        video: videoId
    })
    await videoComment.save()
    videoRecord.videocommentCount++
    await videoRecord.save()
    res.status(200).json({msg:'评论成功'})
}
// 获取视频视频列表
exports.videoCommentList = async(req,res)=>{
    const { videoId } = req.params
    const videoRecord = await Video.findById(videoId)
    if(!videoRecord){
        res.status(401).json({error:'视频不存在'})
    }
    const commentList = await Videocomment.find({video: videoId}).populate('user').populate('video')
    res.status(200).json({commentList})
}
// 删除视频评论
exports.deleteVideoComment = async(req,res)=>{
    const { commentId,videoId } = req.params
    const commentRecord = await Videocomment.findById(commentId)
    if(!commentRecord){
        res.status(401).json({error:'不存在该评论'})
    }else if(commentRecord.user == req.user.userinfo._id){
        // 只有自己才能删除自己的评论
        await Videocomment.deleteOne({_id:commentId})
        const videoRecord = await Video.findById(videoId)
        videoRecord.videocommentCount--
        videoRecord.save()
        res.status(200).json({msg: '删除成功'})
    }else{
        res.status(403).json({error:'权限不足'})
    }
}
// 喜欢或者不喜欢某个视频
exports.videoLike = async(req,res)=>{
    /**
     * 1.这个视频如果不存在要做提醒
     * 2.用户有没有喜欢或者不喜欢的操作痕迹
     * 3.如果用户曾经“喜欢”，删除掉记录
     * 4.如果用户曾经“不喜欢”，like值改为1，保存下来
     * 5.如果用户没有点过这些，添加记录
     */
    const { videoId } = req.params
    const videoRecord = await Video.findById(videoId)
    if(!videoRecord){
        res.status(401).json({error:'该视频不存在'})
    }
    const likeRecord = await VideoLike.findOne({
        user: req.user.userinfo._id,
        video: videoId
    })
    if(likeRecord&&likeRecord.like == 1){
        await VideoLike.deleteOne({_id:likeRecord._id})
        res.status(200).json({msg:'取消喜欢'})
    }else if(likeRecord&&likeRecord == -1){
        likeRecord.like = 1
        await likeRecord.save()
        res.status(200).json({msg:'喜欢视频'})
    }else{
        await new VideoLike({
            user: req.user.userinfo._id,
            video: videoId,
            like: 1
        }).save()
        res.status(200).json({msg:'喜欢视频'})
    }
    videoRecord.likeCount = await VideoLike.countDocuments({
        like: 1,
        user: req.user.userinfo._id
    })
    videoRecord.dislikeCount = await VideoLike.countDocuments({
        like: -1,
        user: req.user.userinfo._id
    })
    await videoRecord.save()
}
// 喜欢视频列表
exports.videolikelist = async(req,res)=>{
    const { pageNum,pageSize } = req.body
    const list = await VideoLike.find({
        user: req.user.userinfo._id,
        like:1
    }).populate('video').skip((pageNum-1)*pageSize).limit(pageSize)
    const total = await VideoLike.countDocuments({
        user: req.user.userinfo._id,
        like: 1
    })
    res.status(200).json({list,total})
}