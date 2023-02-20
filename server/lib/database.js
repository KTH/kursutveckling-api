const log = require('@kth/log')
const { RoundAnalysis } = require('../models/roundAnalysis')

function fetchRoundAnalysisById(id) {
  if (!id) throw new Error('id must be set')
  log.debug('Fetching analysis by id', { _id: id })
  return RoundAnalysis.findOne({ _id: id })
}

function fetchAllRoundAnalysis() {
  log.debug('Fetching all analysis')
  return RoundAnalysis.find()
}

function storeRoundAnalysis(data) {
  if (!data) throw new Error('data must be set in _storeRoundAnalysis')
  else {
    log.debug('Storing organization', { data })
    const doc = new RoundAnalysis(data)
    return doc.save()
  }
}

function updateRoundAnalysis(data) {
  if (data) {
    log.debug('update of roundAnalysis', { data })
    // eslint-disable-next-line no-underscore-dangle
    return RoundAnalysis.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true })
  }
  log.debug('No data', { data })
  return null
}

function removeRoundAnalysisById(id) {
  log.debug('delete roundAnalysis', { id })
  return RoundAnalysis.deleteOne({ _id: id })
}

function fetchAllRoundAnalysisByCourseCode(courseCode) {
  if (!courseCode) throw new Error('courseCode must be set')
  log.debug('Fetching all roundAnalysis for ' + courseCode)
  return RoundAnalysis.aggregate([{ $match: { courseCode } }])
}

function fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode, semester) {
  log.debug('Fetching all roundAnalysis for ' + courseCode + ' filtered by semester: ' + semester)
  return RoundAnalysis.aggregate([{ $match: { courseCode, semester } }])
}

function fetchAllPublishedRoundAnalysisBySemester(semester) {
  log.debug('Fetching all round analyses for semester ', semester)
  return RoundAnalysis.aggregate([{ $match: { semester, isPublished: true } }])
}

module.exports = {
  fetchRoundAnalysisById,
  fetchAllRoundAnalysis,
  storeRoundAnalysis,
  updateRoundAnalysis,
  removeRoundAnalysisById,
  fetchAllRoundAnalysisByCourseCode,
  fetchAllRoundAnalysisByCourseCodeAndSemester,
  fetchAllPublishedRoundAnalysisBySemester,
}
