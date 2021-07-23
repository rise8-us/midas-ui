describe('Creates a product', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.visit('localhost:3000/products')
    })

    it('creates a new product', () => {
        cy.get('[data-testid=ProductCard__header-title]').should('not.exist')

        cy.get('.MuiFab-root').click()
        cy.get('[data-testid=CreateOrUpdateProductPopup__input-name]').type('product 1')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=ProductCard__header-title]').should('have.text', 'product 1')
    })

})