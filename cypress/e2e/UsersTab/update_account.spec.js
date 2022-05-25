describe('Updates own account', () => {

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/UsersTab/insert-users.sql'])
        cy.intercept({
            method: 'GET',
            url: 'http://localhost:8000/api/assertions*',
        }).as('assertion')
        cy.visit('localhost:3000/')

    })
    
    it('Users can update own account info', () => {
        cy.wait('@assertion')
        cy.get('[data-testid=AppBar__account-button]').click()

        cy.get('[data-testid=UserSettings__input-display-name]').within(() => {
            cy.get('input').click().type('{selectall}').type('LocalUserDisplayName')
        })
        cy.get('[data-testid=UserSettings__input-email]').within(() => {
            cy.get('input').click().type('{selectall}').type('LocalUserEmail@some-email.com')
        })
        cy.get('[data-testid=UserSettings__input-phone]').within(() => {
            cy.get('input').click().type('{selectall}').type('012-345-6789')
        })
        cy.get('[data-testid=UserSettings__input-company]').within(() => {
            cy.get('input').click().type('{selectall}').type('Rise8')
        })
        cy.get('[data-testid=UserSettings__button-save]').click()

        cy.get('[data-testid=AppBar__logo]').click()
        cy.reload()
        cy.wait('@assertion')

        cy.get('[data-testid=AppBar__account-button]').click()

        cy.get('[data-testid=UserSettings__input-display-name]').within(() => {
            cy.get('input').should('have.value', 'LocalUserDisplayName')
        })
        cy.get('[data-testid=UserSettings__input-email]').within(() => {
            cy.get('input').should('have.value', 'LocalUserEmail@some-email.com')
        })
        cy.get('[data-testid=UserSettings__input-phone]').within(() => {
            cy.get('input').should('have.value', '012-345-6789')
        })
        cy.get('[data-testid=UserSettings__input-company]').within(() => {
            cy.get('input').should('have.value', 'Rise8')
        })
    })

})