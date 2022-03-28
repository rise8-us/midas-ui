describe('Updates and deletes a products feature', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql', 'e2e/ProductPage/insert-product-features.sql'])
    })

    beforeEach(() => {
        cy.visit('localhost:3000/products/2/overview')
        cy.get('[data-testid=ProductPage__icon-inline-edit]', { timeout: 10000 }).should('be.visible')
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/features/1',
        }).as('updateApiCheck')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/features/1',
        }).as('deleteApiCheck')

        cy.reload()
    })

    it('updates feature name', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('"Alpha feature"', 'Beta feature')

        cy.get('[data-testid=ProductDetails__mission-statement]').click()

        cy.get('[data-testid="Alpha feature"]').should('not.exist')
        cy.get('[data-testid="Beta feature"]').should('exist')

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.title).to.equal('Beta feature')
        })
    })

    it('deletes feature', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.get('[data-testid="Beta feature"]').trigger('mouseover')

        cy.get('[data-testid=DraggableRow__button-delete]').click()

        cy.get('[data-testid="Beta feature"]').should('not.exist')

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})