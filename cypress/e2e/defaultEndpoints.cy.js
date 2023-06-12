context('Checks default endpoints', () => {
  it('GET /_checkApiKey', () => {
    cy.request({
      method: 'GET',
      url: '/_checkApiKey',
      headers: Cypress.env('headers'),
    }).then(response => {
      expect(response.status).to.eq(200)
    })
  })
  it('GET /_monitor', () => {
    cy.request({
      method: 'GET',
      url: '/_monitor?probe=full',
      headers: Cypress.env('headers'),
    }).then(response => {
      expect(response.status).to.eq(200)
      expect(response.body).to.contain(`APPLICATION_STATUS: OK`)
      expect(response.body).to.contain(`mongodb - OK`)
    })
  })
})
