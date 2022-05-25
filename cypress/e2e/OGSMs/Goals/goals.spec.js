describe('update goal', () => { 

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
            url: 'http://localhost:8000/api/measures',
        }).as('createApiCheck')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/measures/12',
        }).as('updateApiCheck')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/measures/12',
        }).as('deleteApiCheck')
    })

    it('should create new goal', () => {
        cy.get('[data-testId="LockOutlinedIcon"]').click()
        cy.get('[data-testId=GoalsContainer__add-item]').click()

        cy.wait('@createApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('Enter new goal here...')
        })

        cy.contains('Enter new goal here...')
    })

    it('should update goal', () => {
        cy.clickAndType('"MeasureCard__title-input-12"', 'updated goal')

        cy.get('[data-testId="Product__objectives"]').click()

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('updated goal')
        })
    })

    it('should delete goal', () => {
        cy.get('[data-testId="MeasureCard__delete-icon-12"]').click()

        cy.get('[data-testId="Popup__button-submit"]').click()

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })
})