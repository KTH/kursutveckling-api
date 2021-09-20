'use strict'

const log = require('kth-node-log')
const { fetchAllRoundAnalysis } = require('../lib/database')
// const db = require('../lib/database')
const fs = require('fs')

const logger = fs.createWriteStream('migratedREF-Aug8.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
})

const loggerMemos = fs.createWriteStream('migratedMemosREF-Aug8.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
})

const loggerMigratedFileNames = fs.createWriteStream('migratedFileNamesREF-Aug8.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
})

const loggerNotPublishedIdAndNames = fs.createWriteStream('unpublishedMemosREF-Aug8.txt', {
  flags: 'a', // 'a' means appending (old data will be preserved)
})
// api
const config = require('../configuration').server
// const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections

const opts = {
  log,
  // redis,
  timeout: 30000,
  checkAPIs: true, // performs api-key checks against the apis, if a "required" check fails, the app will exit. Required apis are specified in the config
}

const api = connections.setup(config.nodeApi, config.apiKey, opts)
// send to kurs-pm-data-api function

async function sendDocumentsTo(body) {
  try {
    const { client, paths } = api.kursPmDataApi
    const { uri } = paths.migrateAllData // "uri":"/api/kurs-pm-data/v1/migrateAll"
    log.debug('Sending data', { uri }, ' with parameter,', JSON.stringify(body))
    const res = await client.postAsync({ uri, body, useCache: false })
    return res.body
  } catch (error) {
    log.debug('sendDocumentsTo Changing of data with parameter', { body }, 'is not available', {
      error,
    })
    return error
  }
}

async function findConflictsAndDuplicates(body) {
  try {
    const { client, paths } = api.kursPmDataApi
    const { uri } = paths.findDublicatesAndMemos // "uri":"/api/kurs-pm-data/v1/findDublicatesAndMemos"
    log.debug('Sending data', { uri }, ' with parameter,', { body })
    const res = await client.postAsync({ uri, body, useCache: false })
    return res.body
  } catch (error) {
    log.debug('findConflictsAndDuplicates is not available', {
      error,
    })
    return error
  }
}

function transformMemo(historyMemo) {
  const {
    _id: prevId,
    courseCode,
    pmFileName: courseMemoFileName,
    pdfPMDate,
    roundIdList,
    semester: rawSemester,
    isPublished,
    ugKeys,
    changedBy,
  } = historyMemo

  if (!courseMemoFileName) return []
  if (!roundIdList) return []
  if (!isPublished) {
    loggerNotPublishedIdAndNames.write(`unpublished ${prevId} has ${courseMemoFileName} \n`)
    return []
  }

  const migrationDate = new Date()
  const arrayOfRoundIds = roundIdList.split(',')
  // const semesterShort = shortSemLabels[rawSemester.toString().slice(-1)]
  // const year = rawSemester.toString().slice(0, 4)

  const memosPerRound = arrayOfRoundIds.map(roundId => ({
    _id: `${courseCode}_${rawSemester}_${roundId}`, // `${_id}TranformedForRound${roundId}`, /// change it to the same standards
    courseCode,
    changedBy,
    koppsRoundId: roundId,
    courseMemoFileName,
    changedAfterPublishedDate: migrationDate,
    semester: rawSemester,
    ugKeys,
    // NEW
    memoFlag: 'historyMemo',
    // prevId: _id,
    // TODO date
    pdfPMDate, // not exist in kurs-pm-data-api
    pdfMemoUploadDate: migrationDate, // When document were published
    lastChangeDate: migrationDate, // Date and time for last change, set by API
  }))
  logger.write(
    `${prevId} (rounds:${arrayOfRoundIds.join(',')}) --> ${memosPerRound.map(newMemo => newMemo._id).join(' and ')} \n`
  )
  loggerMigratedFileNames.write(`${courseMemoFileName} \n`)
  loggerMemos.write(`${memosPerRound.map(m => JSON.stringify(m)).join('\n')} \n`)
  return memosPerRound
}

async function migrate(req, res) {
  const allRawMemos = await fetchAllRoundAnalysis()
  log.info('req.paramsxxxxxx', req.params)
  log.info('req.query', req.query)

  log.info('Type', typeof allRawMemos)
  log.info('Length', allRawMemos.length)
  log.info('first raw', allRawMemos[0])
  log.info('second raw ', allRawMemos[1])

  log.debug('ALL RAW MEMOS ARE FETCHED')
  const allMemos = []
  allRawMemos.forEach(memo => allMemos.push(...transformMemo(memo)))
  const chunkSize = 10
  log.info('first ready', allMemos[0])
  log.info('second ready ', allMemos[1])
  log.info('Prepared data to imigrate ', allMemos.length)
  try {
    const iterations = Math.round(allMemos.length / chunkSize)
    log.info('total iterations ', iterations)

    let newApiResponse = {}
    var i = 0
    for (i = 0; i < iterations; i++) {
      // !!!!! iterations
      log.info('iteration -> ', i)
      newApiResponse = await sendDocumentsTo({
        // documents: [allMemos[0], allMemos[1]],
        documents: allMemos.splice(0, chunkSize),
      })
    }

    if (newApiResponse && newApiResponse.message) {
      log.debug('Error from KURS-PM-DATA-API: ', newApiResponse.message)
      res.send('Error from KURS-PM-DATA-API: ')
    }
    log.info('Memo contents was updated in kursutveckling api')
    return res.send('Finished ')
    //res.json(newApiResponse)
    // res.send('Finished ')
  } catch (err) {
    log.error('Error in migrate', { error: err })
    res.send('Error in migrate')
  }
}

async function findConflicts(req, res) {
  const allRawMemos = await fetchAllRoundAnalysis()
  log.info('req.paramsxxxxxx', req.params)
  log.info('req.query', req.query)

  log.info('Type', typeof allRawMemos)
  log.info('Length', allRawMemos.length)
  log.info('first raw', allRawMemos[0])
  log.info('second raw ', allRawMemos[1])

  log.debug('ALL RAW MEMOS ARE FETCHED Length', allRawMemos.length)
  const allMemos = []
  allRawMemos.forEach(memo => allMemos.push(...transformMemo(memo)))
  log.debug('ALL MEMOS ARE transformed Length', allMemos.length)

  const chunkSize = 10
  // log.info('first ready', allMemos[0])
  // log.info('second ready ', allMemos[1])
  try {
    const iterations = Math.round(allMemos.length / chunkSize)
    let newApiResponse = {}
    var i = 0

    console.log('conflicts')
    for (i = 0; i < iterations; i++) {
      newApiResponse = await findConflictsAndDuplicates({
        // documents: [allMemos[0], allMemos[1]],
        documents: allMemos.splice(0, chunkSize),
      })
    }

    if (newApiResponse && newApiResponse.message) {
      log.debug('Error from KURS-PM-DATA-API: ', newApiResponse.message)
      res.send('Error from KURS-PM-DATA-API: ')
    }
    log.info('Memo contents was updated in kursutveckling api')
    return res.json(newApiResponse)
    // res.send('Finished ')
  } catch (err) {
    log.error('Error in findConflicts', { error: err })
    res.send('Error in findConflicts')
  }
}

module.exports = {
  migrate,
  findConflicts,
}
