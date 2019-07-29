const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
  score: {
    type: String,
    
  },
  time: {
    type: String,
    // required: true
  },
  game: {
    type: Number,
    default:1
    // required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Score', scoreSchema)
