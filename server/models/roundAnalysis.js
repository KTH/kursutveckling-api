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
  analysisName: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  programmeCodes: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  examiners: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  responsibles: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  examinationRounds: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  registeredStudents: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  examinationGrade: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  alterationText: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  commentExam: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  commentChange: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  pdfAnalysisDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  changedDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  changedBy: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  semester: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  },
  roundIdList: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment must have at most 500 characters.'],
    default: ''
  }

})

const RoundAnalysis = mongoose.model('RoundAnalysis', schema)

module.exports = {
  RoundAnalysis: RoundAnalysis,
  schema: schema
}
