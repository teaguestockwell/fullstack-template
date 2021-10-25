const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/feedback/'

describe('Feedback', () => {
  beforeEach(() => {
    cy.exec('npm run reset:reseed:db')
  })

  it('returns all feedback for a session', () => {
    cy.request(ep + '1').then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(10)
    })
  })
})
