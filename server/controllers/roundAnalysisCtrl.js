'use strict'

/**
 * API controller
 */

const RoundAnalysis = require('../models').roundAnalysis.RoundAnalysis
const co = require('co')
const db = require('../lib/database')

module.exports = {
  getAnalysis: co.wrap(getData),
  postAnalysis: co.wrap(postData)
}

function * getData (req, res, next) {
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
    const id = req.body.id

    log.info('Storing roundAnalysis', { _id: id })
    const exists = yield db.fetchRoundAnalysisById(id)

    if (exists) {
      log.info('roundAnalysis already exists, returning...', { _id: id })
      return res.status(400).json({ message: 'An roundAnalysis with that id already exist.' })
    }

    const org = yield db.storeOrganization(req.body)

    const paths = getPaths()
    res.status(201).set({
      'Location': paths.api.getOrganization.uri.replace(':id', org._id)
    }).json(org)
  } catch (err) {
    log.error('Error in postOrganization', { error: err })
    next(err)
  }
}

function * postData (req, res, next) {
  try {
    let doc = yield RoundAnalysis.findById(req.params.id)
    console.log(doc)
    if (!doc) {
      doc = new RoundAnalysis({
        _id: req.params.id,
        courseCode: req.body.courseCode.toUpperCase(),
        round: req.body.round,
        programmeCodes: req.body.programmeCodes,
        examiners: req.body.examiners,
        responsibles: req.body.responsibles,
        examinationRounds: req.body.examinationRounds,
        registeredStudents: req.body.registeredStudents,
        examinationGrade: req.body.examinationGrade,
        alterationText: req.body.alterationText,
        commentExam: req.body.commentExam,
        commentChange: req.body.commentChange,
        isPublished: req.body.isPublished,
        pdfAnalysisDate: req.body.pdfAnalysisDate,
        changedDate: req.body.changedDate,
        changedBy: req.body.changedBy
      })
    } else {
      doc.round = req.body.round
      doc.programmeCodes = req.body.programmeCodes
      doc.examiners = req.body.examiners
      doc.responsibles = req.body.responsibles
      doc.examinationRounds = req.body.examinationRounds
      doc.registeredStudents = req.body.registeredStudents
      doc.examinationGrade = req.body.examinationGrade
      doc.alterationText = req.body.alterationText
      doc.commentExam = req.body.commentExam
      doc.commentChange = req.body.commentChange
      doc.isPublished = req.body.isPublished
      doc.pdfAnalysisDate = req.body.pdfAnalysisDate
      doc.changedDate = req.body.changedDate
      doc.changedBy = req.body.changedBy
    }

    yield doc.save()
    res.json({
      id: doc._id,
      round: doc.round,
      programmeCodes: doc.programmeCodes,
      examiners: doc.examiners,
      responsibles: doc.responsibles,
      examinationRounds: doc.examinationRounds,
      registeredStudents: doc.registeredStudents,
      examinationGrade: doc.examinationGrade,
      courseCode: doc.courseCode,
      alterationText: doc.alterationText,
      commentExam: doc.commentExam,
      commentChange: doc.commentChange,
      isPublished: doc.isPublished,
      pdfAnalysisDate: doc.pdfAnalysisDate,
      changedDate: doc.changedDate,
      changedBy: doc.changedBy
    })
  } catch (err) {
    next(err)
  }
}
