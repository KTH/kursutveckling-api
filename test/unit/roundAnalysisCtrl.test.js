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
    fetchPublishedCanvasRoundAnalysesByCourseCode(courseCode) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
    fetchPublishedAdminWebRoundAnalysesByCourseCode(courseCode) {
      return new Promise((resolve, reject) => {
        resolve({ status: 201 })
      })
    },
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

jest.mock('@kth/log', () => {
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
  test('getAnalysis-getRoundAnalysis', async () => {
    const { getAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await getAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('postAnalysis-postRoundAnalysis, show message that data already exist', async () => {
    const { postAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ body: { id: 'EF111120191_1' } })
    const res = buildRes()
    const response = await postAnalysis(req, res)
    expect(res.status).toHaveBeenNthCalledWith(1, 400)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('putAnalysis-putRoundAnalysis', async () => {
    const { putAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await putAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('deleteAnalysis-deleteRoundAnalysis', async () => {
    const { deleteAnalysis } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({})
    const res = buildRes()
    const response = await deleteAnalysis(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  test('getAnalysisList-getAnalysisListByCourseCode', async () => {
    const { getAnalysisList } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111' } })
    const res = buildRes()
    const response = await getAnalysisList(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  test('getCourseAnalyses', async () => {
    const { getCourseAnalyses } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { semester: '20192' } })
    const res = buildRes()
    const response = await getCourseAnalyses(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
  test('getUsedRounds', async () => {
    const { getUsedRounds } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111', semester: '20192' } })
    const res = buildRes()
    const response = await getUsedRounds(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('getCanvasAnalysisListByCourseCode', async () => {
    const { getCanvasAnalysisListByCourseCode } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111' } })
    const res = buildRes()
    const response = await getCanvasAnalysisListByCourseCode(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })

  test('getAdminWebAnalysisListByCourseCode', async () => {
    const { getAdminWebAnalysisListByCourseCode } = require('../../server/controllers/roundAnalysisCtrl')
    const req = buildReq({ params: { courseCode: 'ef1111' } })
    const res = buildRes()
    const response = await getAdminWebAnalysisListByCourseCode(req, res)
    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
