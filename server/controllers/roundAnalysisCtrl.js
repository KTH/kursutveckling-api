/* eslint-disable consistent-return */

'use strict'

/**
 * API controller
 */

const log = require('kth-node-log')
const db = require('../lib/database')

async function getRoundAnalysis(req, res, next) {
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

async function postRoundAnalysis(req, res, next) {
  try {
    const { _id: id } = req.body

    log.debug('Storing roundAnalysis', { id })
    const exists = await db.fetchRoundAnalysisById(id)

    if (exists) {
      log.debug('roundAnalysis already exists, returning...', { id })
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

async function putRoundAnalysis(req, res, next) {
  try {
    const { _id: id } = req.body
    log.debug('Updating roundAnalysis', { id })

    const doc = await db.fetchRoundAnalysisById(id)

    if (!doc) {
      log.debug('No roundAnalysis found, returning...', { doc })
      return next()
    }

    req.body.changedDate = new Date()
    const dbResponse = await db.updateRoundAnalysis(req.body)

    log.debug('Successfully updated roundAnalysis', { id: dbResponse._id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in putRoundAnalysis', { error: err })
    next(err)
  }
}

async function deleteRoundAnalysis(req, res, next) {
  try {
    const { id } = req.params
    log.debug('Delete roundAnalysis', { id })

    const dbResponse = await db.removeRoundAnalysisById(id)

    log.debug('Successfully removed roundAnalysis', { id })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in deleteRoundAnalysis', { error: err })
    next(err)
  }
}

async function getAnalysisListByCourseCode(req, res, next) {
  const courseCode = req.params.courseCode.toUpperCase()
  const semester = req.params.semester || ''
  let dbResponse
  try {
    if (semester.length === 5) {
      dbResponse = await db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode, semester)
      log.debug('1 Successfully got all analysis for', { courseCode })
    } else {
      dbResponse = await db.fetchAllRoundAnalysisByCourseCode(courseCode)
      log.debug('2 Successfully got all analysis for', { courseCode, dbResponse })
    }

    log.debug('Successfully got all analysis for', { courseCode, dbResponse })
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in getAnalysisListByCourseCode', { error: err })
    next(err)
  }
}

async function getCourseAnalyses(req, res, next) {
  const semester = req.params.semester.toUpperCase()
  let dbResponse
  try {
    dbResponse = await db.fetchAllPublishedRoundAnalysisBySemester(semester)
    log.debug('Successfully got all published analyses for semester ', semester)
    res.json(dbResponse)
  } catch (err) {
    log.error('Error in getCourseAnalyses', { error: err })
    next(err)
  }
}

async function getUsedRounds(req, res, next) {
  const { courseCode, semester } = req.params
  try {
    const dbResponse = await db.fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode.toUpperCase(), semester)
    let returnObject = {
      usedRounds: [],
      publishedAnalysis: [],
      draftAnalysis: [],
    }

    let roundIdList = []
    let tempObject = {}
    for (let index = 0; index < dbResponse.length; index++) {
      tempObject = {
        user: dbResponse[index].changedBy,
        isPublished: dbResponse[index].isPublished,
        analysisId: dbResponse[index]._id,
        analysisName: dbResponse[index].analysisName,
        ugKeys: dbResponse[index].ugKeys,
      }
      if (tempObject.isPublished) {
        returnObject.publishedAnalysis.push(tempObject)
      } else {
        returnObject.draftAnalysis.push(tempObject)
      }

      roundIdList =
        dbResponse[index].roundIdList && dbResponse[index].roundIdList.length > 0
          ? dbResponse[index].roundIdList.split(',')
          : [dbResponse[index].roundIdList]
      for (let index2 = 0; index2 < roundIdList.length; index2++) {
        returnObject.usedRounds.push(roundIdList[index2])
      }
    }
    log.debug('Successfully got used round ids for', {
      courseCode,
      semester,
      result: returnObject,
    })
    res.json(returnObject)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getAnalysis: getRoundAnalysis,
  postAnalysis: postRoundAnalysis,
  putAnalysis: putRoundAnalysis,
  deleteAnalysis: deleteRoundAnalysis,
  getAnalysisList: getAnalysisListByCourseCode,
  getCourseAnalyses,
  getUsedRounds,
}
