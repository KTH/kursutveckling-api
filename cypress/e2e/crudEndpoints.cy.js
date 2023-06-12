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
      headers: Cypress.env('headers'),
      failOnStatusCode: false,
    }).then(response => {
      expect(response.status).to.eq(404)
    })
  })

  it('PUT /courseRoundAnalysis/{id} before creating, returns 404', () => {
    console.log(Cypress.env('headers'))
    cy.request({
      method: 'PUT',
      url,
      headers: Cypress.env('headers'),
      body: defaultCourseRoundAnalysis,
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(404)
    })
  })

  it('POST /courseRoundAnalysis/{id}, with new id returns 201', () => {
    console.log(Cypress.env('headers'))
    cy.request({
      method: 'POST',
      url,
      headers: Cypress.env('headers'),
      body: defaultCourseRoundAnalysis,
    }).then(({ status, body }) => {
      expect(status).to.eq(201)
      expect(body._id).to.eq(id)
      expect(body.courseCode).to.eq(defaultCourseRoundAnalysis.courseCode)
    })
  })

  it('POST /courseRoundAnalysis/{id}, with existing id returns 400', () => {
    console.log(Cypress.env('headers'))
    cy.request({
      method: 'POST',
      url,
      headers: Cypress.env('headers'),
      body: defaultCourseRoundAnalysis,
      failOnStatusCode: false,
    }).then(({ status, body }) => {
      expect(status).to.eq(400)
      expect(body.message).to.eq('An roundAnalysis with that id already exist.')
    })
  })

  it('PUT /courseRoundAnalysis/{id}, with existing id, returns 200', () => {
    console.log(Cypress.env('headers'))
    cy.request({
      method: 'PUT',
      url,
      headers: Cypress.env('headers'),
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
      headers: Cypress.env('headers'),
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })

  it('DELETE /courseRoundAnalysis/{id}, with existing id, returns 200', () => {
    console.log(Cypress.env('headers'))
    cy.request({
      method: 'DELETE',
      url,
      headers: Cypress.env('headers'),
      body: defaultCourseRoundAnalysis,
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
