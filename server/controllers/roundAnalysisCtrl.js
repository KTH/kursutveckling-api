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
  deleteAnalysis: co.wrap(deleteRoundAnalysis),
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

function * deleteRoundAnalysis (req, res, next) {
  try {
    const id = req.params.id
    log.info('Delete roundAnalysis', { id: id })

    const dbResponse = yield db.removeRoundAnalysisById(id)

    log.info('Successfully removed roundAnalysis', { id: id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in deleteRoundAnalysis', { error: err })
    next(err)
  }
}

function * getAnalysisListByCourseCode (req, res, next) {
  const courseCode = req.params.courseCode.toUpperCase()
  const semester = req.params.semester || ''
  let dbResponse
  console.log('!!!!semester!!!!', semester)
  try {
    if (semester.length === 5) {
      dbResponse = yield db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode, semester)
    } else {
      dbResponse = yield db.fetchAllRoundAnalysisByCourseCode(courseCode)
    }

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
    const dbResponse = yield db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode.toUpperCase(), semester)
    let returnObject = {
      usedRounds: [],
      publishedAnalysis: [],
      draftAnalysis: []
    }

    let roundIdList = []
    let tempObject = {}
    for (let index = 0; index < dbResponse.length; index++) {
      tempObject = {
        user: dbResponse[index].changedBy,
        isPublished: dbResponse[index].isPublished,
        analysisId: dbResponse[index]._id,
        analysisName: dbResponse[index].analysisName
      }
      if (tempObject.isPublished) {
        returnObject.publishedAnalysis.push(tempObject)
      } else {
        returnObject.draftAnalysis.push(tempObject)
      }

      roundIdList = dbResponse[index].roundIdList && dbResponse[index].roundIdList.length > 0 ? dbResponse[index].roundIdList.split(',') : [dbResponse[index].roundIdList]
      for (let index2 = 0; index2 < roundIdList.length; index2++) {
        returnObject.usedRounds.push(roundIdList[index2])
      }
    }
    log.info('Successfully got used round ids for', { courseCode: courseCode, semester: semester, result: returnObject })
    res.json(returnObject)
  } catch (error) {
    next(error)
  }
}
