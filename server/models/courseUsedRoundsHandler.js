'use strict'

const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: String,
  courseCode: {
    type: String,
    required: [true, 'Enter Course Code'],
  },
  semesterList: [
    {
      semester: String,
      idList: [Number],
    },
  ],
})

const CourseUsedRoundsHandler = mongoose.model('CourseUsedRoundsHandler', schema)

module.exports = {
  CourseUsedRoundsHandler,
  schema,
}
