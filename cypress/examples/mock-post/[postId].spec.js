const ep = Cypress.env('CYPRESS_BASE_URL') + '/api/v1/example/mock-post/'

it('responds 200', () => {
  cy.request({
    url: ep + '1',
    method: 'GET',
  })
    .its('status')
    .should('eq', 200)
})

it('responds with strict eq body', () => {
  const id = '1'

  cy.request({
    url: ep + id,
    method: 'GET',
  })
    .its('body')
    .should('deep.equal', {
      id,
      title: `Post ${id} title`,
      body: `Post ${id} body`,
    })
})
