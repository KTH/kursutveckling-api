'use strict'

const log = require('kth-node-log')
const db = require('../lib/database')

module.exports = {
  postArchiveFragment: _postArchiveFragment,
  putArchiveFragment: _putArchiveFragment,
  getArchiveFragments: _getArchiveFragments
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

async function _getArchiveFragments (req, res, next) {
  try {
    const dbResponse = await db.fetchAllArchiveFragments()
    res.status(200).json(dbResponse)
  } catch (err) {
    log.error('Error in _getArchiveFragments', { error: err })
    next(err)
  }
}
