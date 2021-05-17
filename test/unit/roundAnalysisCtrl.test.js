jest.mock('../../server/lib/database', () => {
  return {
    fetchRoundAnalysisById(id) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
    updateRoundAnalysis(body) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
    removeRoundAnalysisById(id) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
    fetchAllRoundAnalysisByCourseCodeAndSemester(courseCode, semester) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
    fetchAllRoundAnalysisByCourseCode: jest.fn(),
    fetchAllPublishedRoundAnalysisBySemester: jest.fn(),
  }
})
jest.mock('../../server/configuration', () => {
  return {
    server: {
      api_keys: '1234',
      apiKey: {},
      nodeApi: {},
      db: {},
      logging: {
        log: {
          level: 'debug',
        },
      },
      proxyPrefixPath: {
        uri: 'kursutveckling',
      },
      collections: ['dev-tests'],
    },
  }
})

function buildReq(overrides) {
  const req = { headers: { accept: 'application/json' }, body: {}, params: {}, ...overrides }
  return req
}

function buildRes(overrides = {}) {
  const res = {
    json: jest
      .fn(() => {
        return res
      })
      .mockName('json'),
    status: jest.fn(() => res).mockName('status'),
    type: jest.fn(() => res).mockName('type'),
    send: jest.fn(() => res).mockName('send'),
    render: jest.fn(() => res).mockName('render'),

    ...overrides,
  }
  return res
}

function buildNext(impl) {
  return jest.fn(impl).mockName('next')
}

jest.mock('kth-node-log', () => {
  return {
    init: jest.fn(),
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
  }
})
describe('Test functions of roundAnalysisCtrl.js', () => {
  beforeEach(() => {
    jest.resetModules()
    // process.env = { ...OLD_ENV }
    jest.clearAllMocks()
  })
  test('getAnalysis-getRoundAnalysis', async done => {
    const { getAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await getAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })

  test('postAnalysis-postRoundAnalysis, show message that data already exist', async done => {
    const { postAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ body: { id: 'EF111120191_1' } })
    const res = buildRes()
    const response = await postAnalysis(req, res)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })

  test('putAnalysis-putRoundAnalysis', async done => {
    const { putAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await putAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })

  test('deleteAnalysis-deleteRoundAnalysis', async done => {
    const { deleteAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await deleteAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })
  test('getAnalysisList-getAnalysisListByCourseCode', async done => {
    const { getAnalysisList } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111' } })
    const res = buildRes()
    const response = await getAnalysisList(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })
  test('getCourseAnalyses', async done => {
    const { getCourseAnalyses } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { semester: '20192' } })
    const res = buildRes()
    const response = await getCourseAnalyses(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })
  test('getUsedRounds', async done => {
    const { getUsedRounds } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111', semester: '20192' } })
    const res = buildRes()
    const response = await getUsedRounds(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
    done()
  })
})
