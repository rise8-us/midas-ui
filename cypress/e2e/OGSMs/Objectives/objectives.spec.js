describe('Archive/Unarchive ogsm', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/OGSMs/insert-portfolio.sql'])
        
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
            url: 'http://localhost:8000/api/assertions/5',
        }).as('updateApiCheck')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/assertions/5',
        }).as('deleteApiCheck')
    })

    it('should create objective', () => {
        cy.get('[data-testId="LockOutlinedIcon"]').click()
        cy.get('[data-testId="AddItem__icon-button"]').should('exist')

        cy.get('[data-testId="AddItem__icon-button"]').click()

        cy.wait('@createApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('Enter new objective here...')
        })
        
    })

    it('should update objective', () => {
        cy.get('[data-testId="ObjectiveCard__objective-title"]').click()
        cy.clickAndType('"ObjectiveCard__objective-title"', 'This is a new objective')
        
        cy.get('[data-testId="Product__objectives"]').click()

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.text).to.equal('This is a new objective')
        })
        
    })

    it('should archive objective', () => {
        cy.get('[data-testId="ArchiveOutlinedIcon"]').click()
    })

    it('should delete objective', () => {
        cy.get('[data-testId=FilterListIcon').click()
        cy.get('[data-testId=TooltipOptions__checkbox-1').click()

        cy.get('[data-testId="ObjectiveCard__delete-icon-5"]').click()
        cy.get('[data-testId="Popup__button-submit"]').click()

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })


    })



})