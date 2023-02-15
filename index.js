const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const cors = require('cors')
app.use(cors())

const dotenv = require('dotenv')
dotenv.config()

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const userRoutes = require('./routes/user')
const carRoutes = require('./routes/car')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/users', userRoutes)
app.use('/cars', carRoutes)
app.get('/', (req, res) => {
  res
    .status(200)
    .send(
      'hi bro this route does not do anything you should go to "/cars" or "/users" and enjoy with our api',
    )
})
app.use('*', (req, res) => {
  res.send('page not Found')
})

const PORT = process.env.PORT || 3000
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
