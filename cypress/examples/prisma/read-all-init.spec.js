const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/example/prisma/'

describe('Read all init with reset', () => {
  beforeEach(async () => {
    await cy.exec('npm run reset:db')
  })

  it('return 200', () => {
    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    })
      .its('status')
      .should('equal', 200)
  })

  it('creates an init model and return it', () => {
    cy.request({
      method: 'PUT',
      url: ep + 'init',
    }).then((res) => {
      expect(res.body).to.have.property('id')
    })

    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    }).then((res) => {
      expect(res.body.length).to.equal(1)
    })
  })

  it('resets in between tests', () => {
    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    }).then((res) => {
      expect(res.body.length).to.equal(0)
    })
  })
})

describe('Read all init without reset', () => {
  it('return 200', () => {
    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    })
      .its('status')
      .should('equal', 200)
  })

  it('creates an init model and return it', () => {
    cy.request({
      method: 'PUT',
      url: ep + 'init',
    }).then((res) => {
      expect(res.body).to.have.property('id')
    })

    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    }).then((res) => {
      expect(res.body.length).to.equal(1)
    })
  })

  it('resets in between tests', () => {
    cy.request({
      method: 'GET',
      url: ep + 'read-all-init',
    }).then((res) => {
      expect(res.body.length).to.equal(1)
    })
  })
})
