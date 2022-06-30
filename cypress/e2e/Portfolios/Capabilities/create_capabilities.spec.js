describe('Create a capability', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql'])
        cy.visitBravoPortfolio('requirements')
    })

    it('creates a new capability in requirements tab', () => {
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('button').contains('New Requirement').click()

        cy.get('[data-testid=PortfolioCapabilities__parent-grid]').should('exist')

        cy.wait('@post_capability')
    })

})