const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/example/use-method'

it('return 200 for get', () => {
  cy.request({
    method: 'GET',
    url: ep,
  })
    .its('status')
    .should('equal', 200)
})

it('body has strict equality', () => {
  cy.request({
    method: 'GET',
    url: ep,
  })
    .its('body')
    .should('deep.equal', {
      method: 'GET',
    })
})

it('will not allow put', () => {
  cy.request({
    method: 'PUT',
    url: ep,
    failOnStatusCode: false,
  })
    .its('status')
    .should('equal', 405)
})
