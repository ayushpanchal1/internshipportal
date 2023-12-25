import apirouter from './router/apirouter.js'
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
// import session from 'express-session' //not using it for now, 25th dec
const MONGO_URI = process.env.MONGO_URI
app.use(cors({origin:'http://localhost:3000', credentials: true})) //origin is frontend route
app.use(express.json())
app.use(cookieParser())
// app.use(session({  
//   secret: '678ehdg2383h9je983',  // a secret string used to sign the session ID cookie
//   resave: false,  // don't save session if unmodified
//   saveUninitialized: false  // don't create session until something stored
// }))


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
