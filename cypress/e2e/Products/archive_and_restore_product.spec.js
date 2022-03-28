describe('Archive/Unarchive product', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql'])
        
        cy.visit('localhost:3000/admin')
        cy.get('[data-testid=Admin__products]').click()
    })

    it('should archive product', () => {
        cy.get('[title="edit"]').should('exist')

        cy.get('[title="archive"]').click()

        cy.get('[title="edit"]').should('not.exist')
    })

    it('should unarchive product', () => {
        cy.get('[title="edit"]').should('not.exist')

        cy.get('[title="unarchive"]').click()

        cy.get('[title="edit"]').should('exist')
    })

})