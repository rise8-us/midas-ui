describe('Creates a products feature', () => {

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
            url: 'http://localhost:8000/api/features',
            
          }).as('apiCheck')
    })

    it('creates a feature', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('ProductFeatures__create-feature', 'This is a new feature')

        cy.get('[data-testid=ProductDetails__mission-statement]').click()
        cy.get('[data-testid=FeatureEntry__icon-checkmark]').should('be.visible')

        cy.get('[data-testid="This is a new feature"]').should('have.value', 'This is a new feature')
        
        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})