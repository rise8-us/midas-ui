describe('Create a deliverable', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/Deliverables/insert-deliverable.sql'])
        cy.visit('localhost:3000/portfolios')
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/deliverables',
          }).as('apiCheck')
    })

    it('creates a new deliverable for a capability', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid=AutoSaveTextField__input]').within(() => {
            cy.get('input').type('a new deliverable').type('{enter}')
        })

        cy.get('[data-testid="a new deliverable"]').should('have.value', 'a new deliverable')

        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})