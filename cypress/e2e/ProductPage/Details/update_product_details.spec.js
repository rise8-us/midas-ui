describe('Updates a products details', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql'])
    })

    beforeEach(() => {
        cy.visit('localhost:3000/products/2')
        cy.get('[data-testid=ProductPage__icon-inline-edit]', { timeout: 10000 }).should('be.visible')
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/products/2',
            
          }).as('apiCheck')
    })

    it('updates vision statement', () => {   
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('ProductDetails__vision-statement', 'This is a test vision statement')
        cy.get('[data-testid=ProductDetails__mission-statement]').click()
        cy.get('[data-testid=ProductDetails__vision-statement]').contains('This is a test vision statement')

        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.vision).to.equal('This is a test vision statement')
        })
    })

    it('updates mission statement', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('ProductDetails__mission-statement', 'This is a test mission statement')
        cy.get('[data-testid=ProductDetails__vision-statement]').click()
        cy.get('[data-testid=ProductDetails__mission-statement]').contains('This is a test mission statement')

        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.mission).to.equal('This is a test mission statement')
        })
    })

    it('updates problem statement', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('ProductDetails__problem-statement', 'This is a test problem statement')
        cy.get('[data-testid=ProductDetails__vision-statement]').click()
        cy.get('[data-testid=ProductDetails__problem-statement]').contains('This is a test problem statement')

        cy.wait('@apiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.problemStatement).to.equal('This is a test problem statement')
        })
    })

})