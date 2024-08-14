const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

// 读取文档
exports.getDb = async()=>{
    const back = await readFile('./db.json','utf-8')
    return back
}
// 写入
exports.serveDb = async(data)=>{
    let stringData = JSON.stringify(data)
    return await writeFile('./db.json',stringData)
}