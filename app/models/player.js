const mongoose = require('mongoose')

const scoreSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  level: {
    type: String,
    // required: true
  },
  time: {
    type: String,
    // required: true
  },
//   score: {
//     type: String,
//     // required: true
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
}, {
  timestamps: true
})

module.exports = mongoose.model('Player', scoreSchema)
