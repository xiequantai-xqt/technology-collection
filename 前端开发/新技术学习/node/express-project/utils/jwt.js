const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const tojwt = promisify(jwt.sign)
const verfiy = promisify(jwt.verify)
const { uuid } = require('../config/config.default')

// 加密
module.exports.createToken = async userinfo=>{
    return await tojwt({userinfo},uuid,{expiresIn: 60*60*24})
}
// 验证token
module.exports.verfiyToken = function(require=true){
    return async(req,res,next)=>{
        let token = req.headers.authorization
        token = token?req.headers.authorization.split('Bearer ')[1]:null
        if(token){
            try {
                let userinfo = await verfiy(token,uuid)
                req.user = userinfo
                next()
            } catch (error) {
                res.status(402).json({error:'无效token'})
            }
        }else if(require){
            res.status(402).json({error:'请传入token'})
        }else{
            next()
        }
    }
}