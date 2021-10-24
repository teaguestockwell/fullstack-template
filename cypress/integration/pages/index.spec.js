const host = Cypress.env('CYPRESS_BASE_URL')

describe('index', () => {
  beforeEach(() => {
    cy.visit(host)
    localStorage.setItem('theme', 'light')
    cy.viewport('macbook-13')
  })

  it('toggles dark theme', () => {
    expect(localStorage.getItem('theme')).to.eq('light')
    cy.get(`[aria-label="toggle theme"]`).click()
    cy.get('[data-testid="toggle-dark"]')
  })
})
