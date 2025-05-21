const express = require('express')
const app = express()
const port = 3000
const web = require('./route/web')
const connectdb = require('./db/connectdb')
const fileupload = require('express-fileupload')
const cors = require('cors')


//cors
app.use(cors())
//file upload
app.use(fileupload({ useTempFiles: true }))


//data base connection
connectdb()
//data get
app.use(express.json())

//route load
app.use('/api', web)
app.listen(port, () => {
    console.log(`server start localhost:${port}`)
})