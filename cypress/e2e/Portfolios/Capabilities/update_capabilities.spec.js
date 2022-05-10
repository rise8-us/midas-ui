describe('Update a capability', () => {

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

    it('updates a capability in requirements tab', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid=CapabilityTitle]').type('new capability title').type('{enter}')

        cy.get('[data-testid=CapabilityDescription]').type('a new description').type('{enter}')

        // cy.get('[data-testid=CapabilityTitle]').within(() => {
        //     cy.get('input').should('have.value', 'new capability title')
        // })
        // cy.get('[data-testid=CapabilityDescription]').within(() => {
        //     cy.get('textarea').should('have.text', 'a new description')
        // })

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})