const ObjectID = require('mongodb').ObjectID
const { safeGet } = require('safe-utils')
const log = require('kth-node-log')
const RoundAnalysis = require('../models/roundAnalysis').RoundAnalysis
const CourseUsedRoundsHandler = require('../models/courseUsedRoundsHandler').CourseUsedRoundsHandler
const co = require('co')
// const Level = require('../models/level').Level
// const crypt = require('./crypt')

module.exports = {
  fetchRoundAnalysisById: _fetchRoundAnalysisById,
  storeRoundAnalysis: _storeRoundAnalysis,
  updateRoundAnalysis: _updateRoundAnalysis,
  removeRoundAnalysisById: _removeRoundAnalysisById,
  fetchAllRoundAnalysisByCourseCode: _fetchAllRoundAnalysisByCourseCode,
  fetchAllRoundAnalysisByCourseCodeAndSemester: _fetchAllRoundAnalysisByCourseCodeAndSemester
}

function _fetchRoundAnalysisById (id) {
  if (!id) throw new Error('id must be set')
  log.debug('Fetching analysis by id', { _id: id })
  return RoundAnalysis.findOne({ _id: id }).populate('courseRoundAnalysis').lean()
}

function _storeRoundAnalysis (data) {
  if (!data) throw new Error('data must be set in _storeRoundAnalysis')
  else {
    log.debug('Storing organization', { data: data })
    const doc = new RoundAnalysis(data)
    return doc.save()
  }
}

function _updateRoundAnalysis (data) {
  if (data) {
    log.debug('update of roundAnalysis', { data: data })
    return RoundAnalysis.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true })
  } else {
    log.debug('No data', { data: data })
  }
}

function _removeRoundAnalysisById (id) {
  log.debug('delete roundAnalysis', { id: id })
  return RoundAnalysis.deleteOne({ _id: id })
}

function _fetchAllRoundAnalysisByCourseCode (courseCode) {
  if (!courseCode) throw new Error('courseCode must be set')
  log.debug('Fetching all roundAnalysis for ' + courseCode)
  return RoundAnalysis.find({ courseCode: courseCode }).populate('courseRoundAnalysis').lean()
}

function _fetchAllRoundAnalysisByCourseCodeAndSemester (courseCode, semester) {
  log.debug('Fetching all roundAnalysis for ' + courseCode + ' filtered by semester: ' + semester)
  return RoundAnalysis.find({ courseCode: courseCode, semester: semester }).populate('usedRoundsForCourseAndSemester').lean()
}