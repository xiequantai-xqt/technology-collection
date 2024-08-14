var RPCClient = require('@alicloud/pop-core').RPCClient

function initVodClient(accessKeyId,accessKeySecret){
    var regionId = 'cn-shanghai'
    var client = new RPCClient({
        accessKeyId,
        accessKeySecret,
        endpoint: 'http://vod.'+regionId+'.aliyuncs.com',
        apiVersion: '2017-03-21'
    });
    return client
}

// 获取上传凭证
exports.getvod = async(req,res)=>{
    var client = initVodClient('LTAI5tGUQAyRiKgPyQRMh8tB','ec0Df4Tser4hGJDjZl6AaNUfASwHYL')
    const vodBack = await client.request("CreateUploadVideo",{
        Title: 'title',
        FileName: 'fileName.mp4'
    },{})
    res.status(200).json({vod: vodBack})
}