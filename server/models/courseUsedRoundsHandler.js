'use strict'

const mongoose = require('mongoose')
const { wrap } = require('@kth/kth-node-cosmos-db')

const schema = mongoose.Schema({
  _id: String,
  courseCode: {
    type: String,
    required: [true, 'Enter Course Code']
  },
  semesterList: [
    {
      semester: String,
      idList: [Number]
    }
  ]
})

const CourseUsedRoundsHandler = wrap(mongoose.model('CourseUsedRoundsHandler', schema))

module.exports = {
  CourseUsedRoundsHandler: CourseUsedRoundsHandler,
  schema: schema
}
