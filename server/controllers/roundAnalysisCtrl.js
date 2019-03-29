'use strict'

/**
 * API controller
 */

const RoundAnalysis = require('../models').roundAnalysis.RoundAnalysis
const co = require('co')

module.exports = {
  getAnalysis: co.wrap(getData),
  postAnalysis: co.wrap(postData)
}

function * getData (req, res, next) {
  try {
    let doc = {}
    if (process.env.NODE_MOCK) {
      doc = yield { _id: 0, courseCode: 'xx1122', comment_sv: 'mockdataSV', comment_en: 'mockdataEN' }
    } else {
      doc = yield RoundAnalysis.findById(req.params.id)
    }

    if (!doc) {
      return next()
    }

    res.json({ id: doc._id, courseCode: doc.courseCode, comment_sv: doc.comment_sv, comment_en: doc.comment_en })
  } catch (err) {
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
        comment_en: req.body.comment_en,
        comment_sv: req.body.comment_sv
      })
    } else {
      doc.comment_en = req.body.comment_en
      doc.comment_sv = req.body.comment_sv
    }

    yield doc.save()
    res.json({ id: doc._id, courseCode: doc.courseCode, comment_sv: doc.comment_sv, comment_en: doc.comment_en })
  } catch (err) {
    next(err)
  }
}
