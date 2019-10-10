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
    default: ''
  },
  examinationRounds: {
    type: Array,
    minlength: 0,
    default: []
  },
  registeredStudents: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
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
  endDate: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: ''
  },
  alterationText: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    maxlength: [1500, 'Comment must have at most 1500 characters.'],
    default: ''
  },
  commentExam: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
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
    default: ''
  },
  pdfAnalysisDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    default: ''
  },
  pdfPMDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    default: ''
  },
  changedDate: {
    type: String, // TODO: DATE
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    default: ''
  },
  changedBy: {
    type: String,
    // required: [true, 'Name is required.'],
    trim: true,
    minlength: 0,
    default: ''
  },
  semester: {
    type: String,
    trim: true,
    minlength: 0,
    default: ''
  },
  roundIdList: {
    type: String,
    trim: true,
    minlength: 0,
    default: ''
  },
  analysisFileName: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [50, 'Comment must have at most 500 characters.'],
    default: ''
  },
  pmFileName: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [50, 'Comment must have at most 500 characters.'],
    default: ''
  },
  ugKeys: {
    type: Array,
    default: []
  },
  syllabusStartTerm: {
    type: String,
    default: ''
  },
  changedAfterPublishedDate: {
    type: String,
    default: ''
  },
  examinationGradeFromLadok: {
    type: Boolean,
    default: false
  },
  registeredStudentsFromLadok: {
    type: Boolean,
    default: false
  },
  registeredStudentsLadok: {
    type: Number,
    default: -1
  },
  examinationGradeLadok: {
    type: Number,
    default: -1
  },
  endDateFromLadok: {
    type: Boolean,
    default: false
  },
  endDateLadok: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: ''
  },
  ladokUIDs: {
    type: Array,
    minlength: 0,
    default: []
  }
})

const RoundAnalysis = mongoose.model('RoundAnalysis', schema)

module.exports = {
  RoundAnalysis: RoundAnalysis,
  schema: schema
}
