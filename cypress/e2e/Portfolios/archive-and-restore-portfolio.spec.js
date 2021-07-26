describe('Archive/Unarchive portfolio', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql'])
        
        cy.visit('localhost:3000/admin')
        cy.get('[data-testid=Admin__portfolios]').click()
    })

    it('should archive portfolio', () => {
        cy.get('[title="edit"]').should('exist')

        cy.get('[title="archive"]').click()

        cy.get('[title="edit"]').should('not.exist')
    })

    it('should unarchive portfolio', () => {
        cy.get('[title="edit"]').should('not.exist')

        cy.get('[title="unarchive"]').click()

        cy.get('[title="edit"]').should('exist')
    })

})