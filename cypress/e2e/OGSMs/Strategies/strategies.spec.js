describe('update strategy', () => { 

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/OGSMs/insert-portfolio.sql','e2e/OGSMs/insert-objective.sql'])

        cy.visit('localhost:3000/products/5/objectives')
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).should('be.visible')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/assertions',
        }).as('createApiCheck')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/assertions/11',
        }).as('updateApiCheck')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/assertions/11',
        }).as('deleteApiCheck')
    })

    it('should create new strategy', () => {
        cy.get('[data-testId="LockOutlinedIcon"]').click()
        cy.get('[data-testId=StrategiesContainer__add-item]').click()

        cy.wait('@createApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('Enter new strategy here...')
        })

        cy.get('[data-testId=StrategyCard__title-input-11]').should('exist')
    })

    it('should update strategy', () => {
        cy.clickAndType('"StrategyCard__title-input-11"', 'updated strategy')

        cy.get('[data-testId="Product__objectives"]').click()

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('updated strategy')
        })
    })

    it('should delete strategy', () => {
        cy.get('[data-testId="StrategyCard__delete-icon-11"]').click()

        cy.get('[data-testId="Popup__button-submit"]').click()

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })
})