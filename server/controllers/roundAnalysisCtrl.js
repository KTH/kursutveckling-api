'use strict'

/**
 * API controller
 */

const co = require('co')
const log = require('kth-node-log')
const db = require('../lib/database')

module.exports = {
  getAnalysis: co.wrap(getRoundAnalysis),
  postAnalysis: co.wrap(postRoundAnalysis),
  putAnalysis: co.wrap(putRoundAnalysis),
  getAnalysisList: co.wrap(getAnalysisListByCourseCode),
  getUsedRounds: co.wrap(getUsedRounds)
}

function * getRoundAnalysis (req, res, next) {
  try {
    let doc = {}
    if (process.env.NODE_MOCK) {
      doc = yield { _id: 0, courseCode: 'xx1122' }
    } else {
      doc = yield db.fetchRoundAnalysisById(req.params.id)
    }
    if (!doc) {
      return next()
    }
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

function * postRoundAnalysis (req, res, next) {
  try {
    const id = req.body._id

    log.info('Storing roundAnalysis', { id: id })
    const exists = yield db.fetchRoundAnalysisById(id)

    if (exists) {
      log.info('roundAnalysis already exists, returning...', { id: id })
      return res.status(400).json({ message: 'An roundAnalysis with that id already exist.' })
    }
    req.body.changedDate = new Date()
    const dbResponse = yield db.storeRoundAnalysis(req.body)

    // const paths = getPaths()
    res.status(201)/* .set({
      'Location': paths.api.getdocanization.uri.replace(':id', doc._id)
    }) */.json(dbResponse)
  } catch (err) {
    log.error('Error in postdocanization', { error: err })
    next(err)
  }
}

function * putRoundAnalysis (req, res, next) {
  try {
    const id = req.body._id
    log.info('Updating roundAnalysis', { id: id })

    const doc = yield db.fetchRoundAnalysisById(id)

    if (!doc) {
      log.info('No roundAnalysis found, returning...', { doc: doc })
      return next()
    }

    req.body.changedDate = new Date()
    let dbResponse = yield db.updateRoundAnalysis(req.body)
    // console.log('dbResponse', dbResponse)

    log.info('Successfully updated roundAnalysis', { id: dbResponse._id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in putRoundAnalysis', { error: err })
    next(err)
  }
}

function * getAnalysisListByCourseCode (req, res, next) {
  const courseCode = req.params.courseCode.toUpperCase()
  try {
    const dbResponse = yield db.fetchAllRoundAnalysisByCourseCode(courseCode)
    // console.log(dbResponse)
    log.info('Successfully got all analysis for', { courseCode: courseCode })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in getAnalysisListByCourseCode', { error: err })
    next(err)
  }
}

function * getUsedRounds (req, res, next) {
  const courseCode = req.params.courseCode
  const semester = req.params.semester
  try {
    const dbResponse = db.fetchUsedRounds(courseCode, semester)
    log.info('Successfully got used round ids for', { courseCode: courseCode, semester: semester })
    res.json(dbResponse)
  } catch (error) {

  }
}
