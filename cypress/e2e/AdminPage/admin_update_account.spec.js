describe('Updates own account', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8000/api/assertions*',
        }).as('assertion')
        cy.visit('localhost:3000/')
    })

    it('Regular User cannot access admin portal', () => {
        cy.loadSqlFiles(['e2e/Account/insert-users.sql'])
        cy.wait('@assertion')
        cy.get('[data-testid=AppBar__admin-button]').should('not.exist')

        cy.visit('localhost:3000/admin')

        cy.get('[data-testid=PageNotFound]').should('exist')
    })

})