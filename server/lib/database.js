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
  fetchAllRoundAnalysisByCourseCode: _fetchAllRoundAnalysisByCourseCode
  // fetchUsedRounds: _fetchUsedRounds
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
    log.debug('updating existing roundAnalysis', { data: data })
    // let usedRounds = data._id.split('_')
    // if (usedRounds.length > 1)
    // pushUsedRounds()
    return RoundAnalysis.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true })
  } else {
    log.debug('No data', { data: data })
  }
}

function _fetchAllRoundAnalysisByCourseCode (courseCode) {
  log.debug('Fetching all roundAnalysis for ' + courseCode)
  _fetchUsedRounds(courseCode, '20191')
  return RoundAnalysis.find({ courseCode: courseCode }).populate('courseRoundAnalysis').lean()
}

function _fetchUsedRounds (courseCode, semester = '20191') {
  const dbResponse = RoundAnalysis.find({ courseCode: courseCode }).populate('courseRoundAnalysis').lean()

  // console.log('_fetchUsedRounds.....', dbResponse)
}

function pushUsedRounds (courseCode, semester, list) {
  let hasCourse = CourseUsedRoundsHandler.find({ courseCode: courseCode })
  if (!hasCourse) {
    let doc = new CourseUsedRoundsHandler({
      courseCode: courseCode,
      semesterList: { $push: { semester: semester, roundList: list } }
    })
    console.log(doc)
  }
}
