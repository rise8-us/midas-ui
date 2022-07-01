describe('Checks Portfolio Admin permissions', () => {

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Permissions/insert-portfolio.sql', 'e2e/Portfolios/Permissions/insert-portfolio-admin.sql'])
        cy.visitBravoPortfolio()
    })
    
    it('checks portfolio permissions for Portfolio Admin', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).should('be.visible')
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()
        cy.get('[data-testId=LockOpenOutlinedIcon]', { timeout: 10000 }).should('be.visible')
    })

})