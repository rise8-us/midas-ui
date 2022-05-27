describe('update status of strategy', () => { 

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/OGSMs/insert-portfolio.sql','e2e/OGSMs/insert-objective.sql'])

        cy.visit('localhost:3000/products/5/overview')
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).should('be.visible')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/measures/6',
        }).as('updateMeasureApiCheck')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/measures/5',
        }).as('updateGoalApiCheck')
    })

    it('should update strategy to be completed when child measures is completed', () => {
        cy.get('[data-testId="LockOutlinedIcon"]').click()
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-6]').click()

        cy.get('[data-testId=MeasureCard__collapsable-card-6]').within(() => {
            cy.get('[type="checkbox"]').check()
        })
  
        cy.wait('@updateMeasureApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('COMPLETED')
        }) 

        cy.get('[data-testID=StrategyCard__status-selector-8').contains('Complete').should('exist')
    })

    it('should update objective be completed when all children are completed', () => {
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-5]').click()

        cy.get('[data-testId=MeasureCard__collapsable-card-5]').within(() => {
            cy.get('[type="checkbox"]').check()
        })
  
        cy.wait('@updateGoalApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('COMPLETED')
        }) 

        cy.get('[data-testID=ObjectiveCard__status-selector-7').contains('Complete').should('exist')
    })

})