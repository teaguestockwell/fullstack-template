const host = Cypress.env('CYPRESS_BASE_URL')

describe('index', () => {
  beforeEach(() => {
    cy.visit(host)
    localStorage.setItem('theme', 'light')
    cy.viewport('macbook-13')
  })

  it('loads', () => {
    cy.contains(/example/)
  })

  it('toggles dark theme', () => {
    expect(localStorage.getItem('theme')).to.eq('light')
    cy.get(`[aria-label="toggle theme"]`).click()
    cy.get('[data-testid="toggle-dark"]')
  })

  it('fires emotion media queries', () => {
    cy.contains('example uppercase when media query is lg')
    cy.viewport('iphone-x')
    cy.contains('example uppercase when media query is xl').should('not.exist')
  })
})
