const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(logger('dev'))
app.use(express.static('uploads'))

app.use('/api/v1',require('./router/index'))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`server is running at http://127.0.0.1:${PORT}/api/v1/`)
})