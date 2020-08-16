import mongoose from 'mongoose'
import express from 'express'

var bodyParser = require('body-parser')
var cors = require('cors')

const contactRoute = require('./route/contact')
const surveyRoute = require('./route/survey')

const app = express()
const port = 1995

app.use(cors());
app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 



app.get('/', (req, res) => {
  res.status(200).send('Server is ready')
})

app.use('/contact', contactRoute)
app.use('/survey', surveyRoute)


app.listen(port, () => {
    mongoose.connect('mongodb://localhost:27017/dae-survey?authSource=admin')
    console.log('DAE Survey Server is now running on port 1995')
    console.log('Developer: Hoang Dinh Thinh (hoangdinhthinh@ieee.org)')
})