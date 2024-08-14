/**
 * 在 JavaScript 中，尤其是在 Node.js 环境下，crypto 模块是内置的，用于处理加密相关操作，如哈希、签名、验证、加密和解密等。
 */
const crypto = require('crypto')

module.exports = str =>{
    return crypto
            .createHash('md5')
            .update('xiexie',str)
            .digest('hex')
}