describe('Updates project', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Projects/insert-project-alpha.sql'])
        
        cy.visit('localhost:3000/admin')
        cy.get('[data-testid=Admin__projects]').click()
    })

    it('should archive project', () => {
        cy.get('[title="edit"]').should('exist')

        cy.get('[title="archive"]').click()

        cy.get('[title="edit"]').should('not.exist')
    })

    it('should unarchive project', () => {
        cy.get('[title="edit"]').should('not.exist')

        cy.get('[title="unarchive"]').click()

        cy.get('[title="edit"]').should('exist')
    })

})