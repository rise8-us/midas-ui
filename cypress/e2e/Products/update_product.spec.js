describe('Updates product', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql'])
        cy.visit('localhost:3000/products')
    })

    it('updates product', () => {
        cy.get('[data-testid=ProductCard__header-title]').should('have.text', 'alpha product')

        cy.get('[data-testid=ProductCard__button-edit]').click()
        cy.get('[data-testid=CreateOrUpdateProductPopup__input-name]').clear().type('updated product')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=ProductCard__header-title]').should('have.text', 'updated product')
    })

})