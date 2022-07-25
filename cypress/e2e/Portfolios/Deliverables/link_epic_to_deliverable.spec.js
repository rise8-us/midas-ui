describe('Link epic to a deliverable', () => {

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

    it('updates a deliverable with a new epic', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
        cy.get('[data-testid=Portfolio__requirements]').click()
        cy.get('[data-testid=Portfolio__button-edit]').click()

        cy.get('[data-testid="deliverable with linked epic"]').click()
        cy.get('[data-testid=PortfolioCapabilities__parent-grid]').within(() => {
            cy.get('[data-testid=LinkIcon]').click()
        })

        cy.get('[data-testid=Collapsable__card]').first().click()
        cy.get('[data-testid=Collapsable__card]').next().click()

        cy.get('[data-testid=EpicListItem__checkbox-unchecked]').click()
        
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })
})