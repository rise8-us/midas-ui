describe('Creates a products persona', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql'])
    })

    beforeEach(() => {
        cy.visit('localhost:3000/products/2/overview')
        cy.get('[data-testid=ProductPage__icon-inline-edit]', { timeout: 10000 }).should('be.visible')
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/personas',
            
          }).as('apiCheck')

    })

    it('creates a persona', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('ProductUserPersonas__create-personas', 'New Persona')

        cy.get('[data-testid=ProductDetails__mission-statement]').click()
        
        cy.get('[data-testid="New Persona"]').should('have.value', 'New Persona')
        
        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })

        cy.get('[data-testid="New Persona"]').trigger('mouseover')
        
        cy.get('[data-testid=RadioButtonUncheckedOutlinedIcon]').should('exist')
    })

})