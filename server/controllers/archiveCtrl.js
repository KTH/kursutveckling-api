'use strict'

const log = require('kth-node-log')
const db = require('../lib/database')

module.exports = {
  postArchiveFragment: _postArchiveFragment
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
