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
    default: '',
  },
  programmeCodes: {
    type: String,
    trim: true,
    minlength: 0,
    default: '',
  },
  examiners: {
    type: String,
    trim: true,
    minlength: 0,
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
