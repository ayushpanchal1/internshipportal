import apirouter from './router/apirouter.js'
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URI = process.env.MONGO_URI
app.use(cors())
app.use(express.json())

console.log('server starting')

// Mongo DB connection
mongoose.connect(MONGO_URI)
const connection = mongoose.connection
connection.once('open', () => {
  try {
    console.log('MongoDB connected')
  } catch (e) {
    console.error(e)
  }
})

//test api req
app.get('/hello', (req, res) => {
  res.send('hello world')
})

app.use('/api', apirouter)

app.listen(1337, () => {
  console.log('server started on port 1337')
})
