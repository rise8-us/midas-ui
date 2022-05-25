describe('Delete a capability', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/Capabilities/insert-capability.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/capabilities/*',
        }).as('deleteApiCheck')
    })

    it('Delete a capability in requirements tab', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid=CapabilityTitle]').trigger('mouseover')
        cy.get('[data-testid=CapabilityTitle__delete-icon]').click()

        cy.get('[data-testid=CapabilityTitle]').should('not.exist')
        
        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})