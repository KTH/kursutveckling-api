context('Checks list endpoints', () => {
  const courseCode = 'CYPRESS_LIST'
  const id = `${courseCode}_TEST_ID`

  const semester1 = '17001'
  const semester2 = '17002'

  const listIndicesSemester1 = [0, 1, 2, 3].map(index => `${id}_${index}_${semester1}`)
  const listIndicesSemester2 = [0, 1].map(index => `${id}_${index}_${semester2}`)

  const getAnalysisListByCourseCodeUrl = semester => `/v1/courseAnalysisList/${courseCode}/${semester}`

  it('getAnalysisListByCourseCode returns 0 analyses', () => {
    cy.request({
      method: 'GET',
      url: getAnalysisListByCourseCodeUrl(semester1),
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.length).to.eq(0)
    })
  })

  it(`Setup: creating 4 published analyses for semester ${semester1}`, () => {
    listIndicesSemester1.map(_id =>
      cy
        .request({
          method: 'POST',
          url: `/v1/courseRoundAnalysis/${_id}`,
          body: {
            _id,
            courseCode,
            semester: semester1,
            isPublished: true,
          },
        })
        .then(({ status }) => {
          expect(status).to.eq(201)
        })
    )
  })

  it(`Setup: creating 4 analyses for semester ${semester2}`, () => {
    listIndicesSemester2.map(_id =>
      cy
        .request({
          method: 'POST',
          url: `/v1/courseRoundAnalysis/${_id}`,
          body: {
            _id,
            courseCode,
            semester: semester2,
            isPublished: true,
          },
        })
        .then(({ status }) => {
          expect(status).to.eq(201)
        })
    )
  })

  it(`getAnalysisListByCourseCode and semester ${semester1} returns 4 analyses`, () => {
    cy.request({
      method: 'GET',
      url: getAnalysisListByCourseCodeUrl(semester1),
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.length).to.eq(4)
    })
  })

  it(`getCourseAnalysesForSemester ${semester1} returns 4 analyses`, () => {
    cy.request({
      method: 'GET',
      url: `/v1/courseAnalyses/${semester1}`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.length).to.eq(4)
    })
  })

  it(`getCourseAnalysesForSemester ${semester2} returns 2 analyses`, () => {
    cy.request({
      method: 'GET',
      url: `/v1/courseAnalyses/${semester2}`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.length).to.eq(2)
    })
  })

  it(`getCourseAnalysesForSemestersList returns 6 analyses`, () => {
    cy.request({
      method: 'GET',
      url: `/v1/courseAnalysesForSemestersList?semesters=${semester1},${semester2}`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.length).to.eq(6)
    })
  })

  it(`getUsedRounds`, () => {
    cy.request({
      method: 'GET',
      url: `/v1/usedRoundsForCourse/${courseCode}/semester/${semester1}`,
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.publishedAnalysis.length).to.eq(4)
      expect(body.usedRounds.length).to.eq(4)
      expect(body.draftAnalysis.length).to.eq(0)
    })
  })

  const deleteCourseAnalysis = _id =>
    cy.request({
      method: 'DELETE',
      url: `/v1/courseRoundAnalysis/${_id}`,
    })

  it('Teardown', () => {
    listIndicesSemester1.map(_id => {
      deleteCourseAnalysis(_id).then(({ status }) => {
        expect(status).to.eq(200)
      })
    })

    listIndicesSemester2.map(_id => {
      deleteCourseAnalysis(_id).then(({ status }) => {
        expect(status).to.eq(200)
      })
    })
  })
})
