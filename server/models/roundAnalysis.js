'use strict'

const mongoose = require('mongoose')

const schema = mongoose.Schema({
  _id: String,
  courseCode: {
    type: String,
    required: [true, 'Enter Course Code'],
  },
  analysisName: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Analysis Name can have at most 500 characters.'],
    default: '',
  },
  programmeCodes: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Programme Codes can have at most 500 characters.'],
    default: '',
  },
  examiners: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Examiners can have at most 500 characters.'],
    default: '',
  },
  responsibles: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  examinationRounds: {
    type: Array,
    minlength: 0,
    default: [],
  },
  registeredStudents: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  examinationGrade: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Examination Grade must have at most 500 characters.'],
    default: '',
  },
  endDate: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: '',
  },
  alterationText: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [2000, 'Alteration Text can have at most 2000 characters.'],
    default: '',
  },
  commentExam: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  commentChange: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [500, 'Comment Change can have at most 500 characters.'],
    default: '',
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  publishedDate: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: '',
  },
  pdfAnalysisDate: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: '',
  },
  changedDate: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: '',
  },
  changedBy: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  semester: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  roundIdList: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  analysisFileName: {
    type: String,
    trim: true,
    minlength: 0,
    maxlength: [50, 'Analysis File Name can have at most 50 characters.'],
    default: '',
  },
  ugKeys: {
    type: Array,
    default: [],
  },
  syllabusStartTerm: {
    type: String,
    default: '',
  },
  changedAfterPublishedDate: {
    type: String,
    default: '',
  },
  examinationGradeFromLadok: {
    type: Boolean,
    default: false,
  },
  registeredStudentsFromLadok: {
    type: Boolean,
    default: false,
  },
  registeredStudentsLadok: {
    type: Number,
    default: -1,
  },
  examinationGradeLadok: {
    type: Number,
    default: -1,
  },
  endDateFromLadok: {
    type: Boolean,
    default: false,
  },
  endDateLadok: {
    type: String, // TODO: DATE
    trim: true,
    minlength: 0,
    default: '',
  },
  ladokUIDs: {
    type: Array,
    minlength: 0,
    default: [],
  },
})

const RoundAnalysis = mongoose.model('RoundAnalysis', schema)

module.exports = {
  RoundAnalysis,
  schema,
}
