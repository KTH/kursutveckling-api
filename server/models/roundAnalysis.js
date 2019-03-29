'use strict'

/**
 * Sample API model. Can safely be removed.
 */

const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: String,
  courseCode: {
    type: String,
    required: [true, 'Enter Course Code']
  },
  comment_sv: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  comment_en: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  }
})

const RoundAnalysis = mongoose.model('RoundAnalysis', schema)
console.log('RoundAnalysis', RoundAnalysis)

module.exports = {
  RoundAnalysis: RoundAnalysis,
  schema: schema
}
