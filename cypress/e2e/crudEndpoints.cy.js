context('Checks CRUD endpoints', () => {
  const id = 'CYPRESS_TEST_ID'

  const url = `/v1/courseRoundAnalysis/${id}`

  const defaultCourseRoundAnalysis = {
    _id: id,
    courseCode: 'CYPRESS',
  }

  const analysisName = 'Some analysis name'

  it('GET /courseRoundAnalysis/{id} before creating, returns 404', () => {
    cy.request({
      method: 'GET',
      url,
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404)
    })
  })

  it('PUT /courseRoundAnalysis/{id} before creating, returns 404', () => {
    cy.request({
      method: 'PUT',
      url,
      body: defaultCourseRoundAnalysis,
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(404)
    })
  })

  it('POST /courseRoundAnalysis/{id}, with new id returns 201', () => {
    cy.request({
      method: 'POST',
      url,
      body: defaultCourseRoundAnalysis,
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body._id).to.eq(id)
      expect(body.courseCode).to.eq(defaultCourseRoundAnalysis.courseCode)
    })
  })

  it('POST /courseRoundAnalysis/{id}, with existing id returns 400', () => {
    cy.request({
      method: 'POST',
      url,
      body: defaultCourseRoundAnalysis,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.message).to.eq('An roundAnalysis with that id already exist.')
    })
  })

  it('PUT /courseRoundAnalysis/{id}, with existing id, returns 200', () => {
    cy.request({
      method: 'PUT',
      url,
      body: { ...defaultCourseRoundAnalysis, analysisName },
    }).then(({ status, body }) => {
      expect(status).to.eq(200)
      expect(body.analysisName).to.eq(analysisName)
    })
  })

  it('GET /courseRoundAnalysis/{id} with existing id, returns 200', () => {
    cy.request({
      method: 'GET',
      url,
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })

  it('DELETE /courseRoundAnalysis/{id}, with existing id, returns 200', () => {
    cy.request({
      method: 'DELETE',
      url,
      body: defaultCourseRoundAnalysis,
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
