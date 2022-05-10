describe('Create a capability', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/capabilities',
          }).as('apiCheck')
    })

    it('creates a new capability in requirements tab', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('button').contains('New Requirement').click()

        cy.get('[data-testid=PortfolioCapabilities__parent-grid]').should('exist')

        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})