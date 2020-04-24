const log = require('kth-node-log')
const mongoose = require('mongoose')
const RoundAnalysis = require('../models/roundAnalysis').RoundAnalysis
const ArchiveFragment = require('../models/archiveFragment').ArchiveFragment

module.exports = {
  fetchRoundAnalysisById: _fetchRoundAnalysisById,
  storeRoundAnalysis: _storeRoundAnalysis,
  updateRoundAnalysis: _updateRoundAnalysis,
  removeRoundAnalysisById: _removeRoundAnalysisById,
  fetchAllRoundAnalysisByCourseCode: _fetchAllRoundAnalysisByCourseCode,
  fetchAllRoundAnalysisByCourseCodeAndSemester: _fetchAllRoundAnalysisByCourseCodeAndSemester,
  fetchAllPublishedRoundAnalysisBySemester: _fetchAllPublishedRoundAnalysisBySemester,
  storeArchiveFragment: _storeArchiveFragment,
  fetchAllArchiveFragments: _fetchAllArchiveFragments,
  fetchArchiveFragments: _fetchArchiveFragments,
  updateExportedArchiveFragments: _updateExportedArchiveFragments
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

function _fetchAllPublishedRoundAnalysisBySemester (semester) {
  log.debug('Fetching all round analyses for semester ', semester)
  return RoundAnalysis.find({ semester: semester, isPublished: true }).populate('courseRoundAnalysis').lean()
}

function _storeArchiveFragment (data) {
  log.debug('Storing archive fragment', data)
  const doc = new ArchiveFragment(data)
  return doc.save()
}

function _fetchAllArchiveFragments () {
  log.debug('Fetching all archive fragments')
  return ArchiveFragment.find({ }).populate('ArchiveFragmentList').lean()
}

function _fetchArchiveFragments (includeExported) {
  log.debug(includeExported ? 'Fetching all archive fragments, including exported' : 'Fetching all archive fragments, excluding exported')
  return ArchiveFragment.find({ exported: includeExported }).populate('ArchiveFragmentList').lean()
}

function _updateExportedArchiveFragments (ids) {
  const idsQuery = ids.map(function (id) { return mongoose.Types.ObjectId(id) })
  return ArchiveFragment.update({
    '_id': { $in: idsQuery } }, { '$set': { 'exported': true } }, { 'multi': true })
}
