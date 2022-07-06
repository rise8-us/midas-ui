describe('Updates own account', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/UsersTab/insert-users.sql'])
        cy.visit('localhost:3000/')
    })

    it('Regular User cannot access admin portal', () => {
        cy.get('[data-testid=AppBar__admin-button]').should('not.exist')

        cy.visit('localhost:3000/admin')

        cy.get('[data-testid=PageNotFound]').should('exist')
    })

})