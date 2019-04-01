'use strict'

/**
 * API controller
 */

const RoundAnalysis = require('../models').roundAnalysis.RoundAnalysis
const co = require('co')
const log = require('kth-node-log')
const db = require('../lib/database')
const ObjectID = require('mongodb').ObjectID

module.exports = {
  getAnalysis: co.wrap(getRoundAnalysis),
  postAnalysis: co.wrap(postRoundAnalysis),
  putAnalysis: co.wrap(putRoundAnalysis),
  getAnalysisListByCourseCode: co.wrap(getAnalysisListByCourseCode)
}

function * getRoundAnalysis (req, res, next) {
  try {
    let doc = {}
    if (process.env.NODE_MOCK) {
      doc = yield { _id: 0, courseCode: 'xx1122', commentSv: 'mockdataSV', commentEn: 'mockdataEN' }
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
    const isPublished = req.body.isPublished

    log.info('Updating roundAnalysis', { id: id })

    const doc = yield db.fetchRoundAnalysisById(id)

    if (!doc) {
      log.info('No roundAnalysis found, returning...', { doc: doc })
      return next()
    }

    req.body.changedDate = new Date()
    let dbResponse = yield db.storeRoundAnalysis(req.body)
    console.log('dbResponse', dbResponse)

    log.info('Successfully updated roundAnalysis', { id: dbResponse._id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in putRoundAnalysis', { error: err })
    next(err)
  }
}

function getAnalysisListByCourseCode (req, res, next) {
  return ''
}
