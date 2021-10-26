const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/feedback'

describe('Feedback', () => {
  // beforeEach(() => {
  //   cy.exec('npm run reset:reseed:db')
  // })

  it('200 pagianted feedbacks', () => {
    cy.request(ep).then((response) => {
      expect(response.status).to.eq(200)
    })
  })

  it('400 for invalid query params', () => {
    cy.request({
      method: 'GET',
      url: ep + '?rating=-1',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('400 for invalid query params', () => {
    cy.request({
      method: 'GET',
      url: ep + '?rating=10',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('400 for invalid query params', () => {
    cy.request({
      method: 'GET',
      url: ep + '?rating=10',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400)
    })
  })

  it('405 for invalid method', () => {
    cy.request({
      method: 'POST',
      url: ep,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(405)
    })
  })
})
