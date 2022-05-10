describe('Link a capability', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/Capabilities/insert-capability.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/capabilities/*',
        }).as('updateApiCheck')
    })

    it('links a capability to an existing portfolio in requirements tab', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()
        cy.get('[data-testid=MoreVertIcon]').click()

        cy.contains('Link existing').click()
        cy.get('[data-testid=LinkCapabilityPopup__select]').click()
        cy.contains('capability to link').click()
        cy.get('[data-testid=Popup__button-cancel]').click()

        cy.get('[data-testid=PortfolioCapabilities__next-button]').click()

        cy.get('[data-testid=CapabilityTitle]').within(() => {
            cy.get('input').should('have.value', 'capability to link')
        })

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})