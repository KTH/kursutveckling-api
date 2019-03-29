const ObjectID = require('mongodb').ObjectID
const { safeGet } = require('safe-utils')
const log = require('kth-node-log')
const RoundAnalysis = require('../models/roundAnalysis').RoundAnalysis
const co = require('co')
// const Level = require('../models/level').Level
// const crypt = require('./crypt')

module.exports = {
  fetchRoundAnalysisById: _fetchRoundAnalysisById,
  storeRoundAnalysis: _storeRoundAnalysis
}

function _fetchRoundAnalysisById (id) {
  if (!id) throw new Error('id must be set')
  log.debug('Fetching analysis by id', { _id: id })
  return RoundAnalysis.findOne({ _id: id }).populate('courseRoundAnalysis').lean()
}

function _storeRoundAnalysis (data) {
  if (!data) throw new Error('data must be set in _storeRoundAnalysis')
  if (data.id) {
    log.debug('updating existing roundAnalysis', { data: data })
    return RoundAnalysis.findOneAndUpdate({ _id: data.id }, { $set: data }, { new: true })
  } else {
    log.debug('Storing organization', { data: data })
    const org = new RoundAnalysis(data)
    return org.save()
  }
}
