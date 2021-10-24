const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/example/use-params/'

it('responds 200', () => {
  cy.request({
    url: ep + '1',
    method: 'GET',
  })
    .its('status')
    .should('eq', 200)
})

it('responds with strict eq body', () => {
  cy.request({
    url: ep + '1',
    method: 'GET',
  })
    .its('body')
    .should('deep.equal', {
      pk: '1',
    })
})
