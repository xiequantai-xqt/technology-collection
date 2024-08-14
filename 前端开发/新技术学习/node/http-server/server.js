// 1.导入http模块
var http = require('http')
var fs = require('fs')
// 2.创建服务器
// 获取到服务器的实例对象
var server = http.createServer()
server.listen(8080,function(){
    console.log('http://127.0.0.1:8080');
})

// 监听客户端请求事件
server.on('request',function(req,res){
    if(req.method == 'GET'){
        fs.readFile('./http-server/index.html','utf-8',function(err,data){
            res.write(data)
            res.end()
        })
    }
})
