const { body } = require('express-validator')
const validate = require('./errorBack')

module.exports.videoValidator = validate([
    body('title')
    .notEmpty().withMessage('视频标题不能为空').bail()
    .isLength({max:20}).withMessage('视频标题最多20个字').bail(),
    body('vodvideoId')
    .notEmpty().withMessage('视频ID不能为空').bail()
])