const mongoose = require('mongoose')

const carSchema = mongoose.Schema({
  model: {
    type: Number,
    required: true,
  },
  selectedFile: String,
  maxSpeed: {
    type: String,
    required: true,
  },
  maker: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Car', carSchema)
