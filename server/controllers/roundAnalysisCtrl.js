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
  getCourseAnalyses: co.wrap(getCourseAnalyses),
  getUsedRounds: co.wrap(getUsedRounds)
}

async function getRoundAnalysis (req, res, next) {
  try {
    let doc = {}
    if (process.env.NODE_MOCK) {
      doc = await { _id: 0, courseCode: 'xx1122' }
    } else {
      doc = await db.fetchRoundAnalysisById(req.params.id)
    }
    if (!doc) {
      return next()
    }
    res.json(doc)
  } catch (err) {
    next(err)
  }
}

async function postRoundAnalysis (req, res, next) {
  try {
    const id = req.body._id

    log.debug('Storing roundAnalysis', { id: id })
    const exists = await db.fetchRoundAnalysisById(id)

    if (exists) {
      log.debug('roundAnalysis already exists, returning...', { id: id })
      return res.status(400).json({ message: 'An roundAnalysis with that id already exist.' })
    }
    req.body.changedDate = new Date()
    const dbResponse = await db.storeRoundAnalysis(req.body)
    res.status(201).json(dbResponse)
  } catch (err) {
    log.error('Error in postdocanization', { error: err })
    next(err)
  }
}

async function putRoundAnalysis (req, res, next) {
  try {
    const id = req.body._id
    log.debug('Updating roundAnalysis', { id: id })

    const doc = await db.fetchRoundAnalysisById(id)

    if (!doc) {
      log.debug('No roundAnalysis found, returning...', { doc: doc })
      return next()
    }

    req.body.changedDate = new Date()
    let dbResponse = await db.updateRoundAnalysis(req.body)

    log.debug('Successfully updated roundAnalysis', { id: dbResponse._id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in putRoundAnalysis', { error: err })
    next(err)
  }
}

async function deleteRoundAnalysis (req, res, next) {
  try {
    const id = req.params.id
    log.debug('Delete roundAnalysis', { id: id })

    const dbResponse = await db.removeRoundAnalysisById(id)

    log.debug('Successfully removed roundAnalysis', { id: id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in deleteRoundAnalysis', { error: err })
    next(err)
  }
}

async function getAnalysisListByCourseCode (req, res, next) {
  const courseCode = req.params.courseCode.toUpperCase()
  const semester = req.params.semester || ''
  let dbResponse
  try {
    if (semester.length === 5) {
      dbResponse = await db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode, semester)
    } else {
      dbResponse = await db.fetchAllRoundAnalysisByCourseCode(courseCode)
    }

    log.debug('Successfully got all analysis for', { courseCode: courseCode })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in getAnalysisListByCourseCode', { error: err })
    next(err)
  }
}

async function getCourseAnalyses (req, res, next) {
  const semester = req.params.semester.toUpperCase()
  log.debug('getCourseAnalyses for semester: ', semester)
  try {
    // db call
  } catch (err) {
    log.error('Error in getCourseAnalyses', { error: err })
    next(err)
  }
}

async function getUsedRounds (req, res, next) {
  const courseCode = req.params.courseCode
  const semester = req.params.semester
  try {
    const dbResponse = await db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode.toUpperCase(), semester)
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
        analysisName: dbResponse[index].analysisName,
        ugKeys: dbResponse[index].ugKeys
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
    log.debug('Successfully got used round ids for', { courseCode: courseCode, semester: semester, result: returnObject })
    res.json(returnObject)
  } catch (error) {
    next(error)
  }
}
