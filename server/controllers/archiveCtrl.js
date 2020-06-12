'use strict'

const log = require('kth-node-log')
const db = require('../lib/database')
const archive = require('../lib/archive')

module.exports = {
  postArchiveFragment: _postArchiveFragment,
  putArchiveFragment: _putArchiveFragment,
  getAllArchiveFragments: _getAllArchiveFragments,
  putExportedArchiveFragments: _putExportedArchiveFragments,
  createArchivePackage: _createArchivePackage
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

async function _putExportedArchiveFragments (req, res, next) {
  try {
    const keys = req.body
    log.debug('Set exported in _putExportedArchiveFragments with keys:', keys)
    const dbResponse = await db.updateExportedArchiveFragments(keys)
    res.status(200).json(dbResponse)
  } catch (err) {
    log.error('Error in _putExportedArchiveFragments', { error: err })
    next(err)
  }
}

async function _createArchivePackage (req, res, next) {
  try {
    const ids = req.body
    log.debug('Create in _createArchivePackage with ids:', ids)
    const archiveFragments = await db.fetchArchiveFragments(ids)
    console.log('Create in _createArchivePackage with fragments:', archiveFragments)
    const archivePackageName = 'archive.zip'
    res.status(200).set('Content-Type', 'application/zip').set('Content-Disposition', `attachment;filename=${archivePackageName}`)
    const archivePackageStream = await archive.createPackageStream(archiveFragments)
    archivePackageStream.pipe(res)
  } catch (err) {
    log.error('Error in _createArchivePackage', { error: err })
    next(err)
  }
}
