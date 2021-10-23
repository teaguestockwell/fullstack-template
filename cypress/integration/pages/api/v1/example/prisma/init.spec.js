const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/example/prisma/init'

it('return 200', () => {
  cy.request({
    method: 'PUT',
    url: ep,
  })
    .its('status')
    .should('equal', 200)
})

it('creates an init model', () => {
  cy.request({
    method: 'PUT',
    url: ep,
  }).then((res) => {
    expect(res.body).to.have.property('id')
  })
})
