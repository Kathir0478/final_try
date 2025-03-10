const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./route')
app.use(express.json())
app.use(cors())
app.use('/api', router)

async function connectDb() {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("DB connected")
}
app.listen(process.env.PORT, async () => {
    console.log("Server started")
    await connectDb()
})