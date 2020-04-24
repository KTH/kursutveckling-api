'use strict'

const log = require('kth-node-log')
const db = require('../lib/database')

module.exports = {
  postArchiveFragment: _postArchiveFragment,
  putArchiveFragment: _putArchiveFragment,
  getAllArchiveFragments: _getAllArchiveFragments,
  getExportedArchiveFragments: _getExportedArchiveFragments,
  putExportedArchiveFragments: _putExportedArchiveFragments
}

async function _postArchiveFragment (req, res, next) {
  try {
    const dbResponse = await db.storeArchiveFragment(req.body)
    res.status(201).json(dbResponse)
  } catch (err) {
    log.error('Error in _postArchiveFragment', { error: err })
    next(err)
  }
}

// Currently identical to _postArchiveFragment.
// Future implementations might mean another db method call for put.
async function _putArchiveFragment (req, res, next) {
  try {
    const dbResponse = await db.storeArchiveFragment(req.body)
    res.status(201).json(dbResponse)
  } catch (err) {
    log.error('Error in _putArchiveFragment', { error: err })
    next(err)
  }
}

async function _getAllArchiveFragments (req, res, next) {
  try {
    const dbResponse = await db.fetchAllArchiveFragments()
    res.status(200).json(dbResponse)
  } catch (err) {
    log.error('Error in _getAllArchiveFragments', { error: err })
    next(err)
  }
}

async function _getExportedArchiveFragments (req, res, next) {
  try {
    const dbResponse = await db.fetchArchiveFragments(true)
    res.status(200).json(dbResponse)
  } catch (err) {
    log.error('Error in _getArchiveFragments', { error: err })
    next(err)
  }
}

async function _putExportedArchiveFragments (req, res, next) {
  try {
    const ids = req.body
    const dbResponse = await db.updateExportedArchiveFragments(ids)
    res.status(200).json(dbResponse)
  } catch (err) {
    log.error('Error in _putExportedArchiveFragments', { error: err })
    next(err)
  }
}
