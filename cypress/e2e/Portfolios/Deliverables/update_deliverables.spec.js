describe('Update a deliverable', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/Deliverables/insert-deliverable.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/deliverables/*',
        }).as('updateApiCheck')
    })

    it('updates a deliverable for a capability', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid=AutoSaveTextField__input]').within(() => {
            cy.get('input').type('a new deliverable').type('{enter}')
        })
        cy.get('[data-testid="a new deliverable"]').click().type('a different deliverable title{enter}')
        cy.get('[data-testid="a different deliverable title"]').should('have.value', 'a different deliverable title')

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })
})