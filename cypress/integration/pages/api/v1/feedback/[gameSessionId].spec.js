const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/feedback/1'

describe('Feedback', () => {
  // beforeEach(() => {
  //   cy.exec('npm run reset:reseed:db')
  // })

  it('returns 405', () => {
    cy.request({
      method: 'GET',
      url: ep,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })

  it('returns 403', () => {
    cy.request({
      method: 'PUT',
      url: ep,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403)
    })
  })
})
