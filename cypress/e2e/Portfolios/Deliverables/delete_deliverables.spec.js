describe('Delete a deliverable', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/Deliverables/insert-deliverable.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/deliverables/*',
        }).as('deleteApiCheck')
    })

    it('Delete a deliverable attached to a capability', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid=AutoSaveTextField__input]').within(() => {
            cy.get('input').type('a new deliverable').type('{enter}')
        })
        cy.get('[data-testid="a new deliverable"]').trigger('mouseover')
        cy.get('[data-testid="a new deliverable"]').parent().within(() => {
            cy.get('button').click()
        })

        cy.get('[data-testid="a new deliverable"]').should('not.exist')

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })
})