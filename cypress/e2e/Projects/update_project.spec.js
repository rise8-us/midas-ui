describe('Updates project', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Projects/insert-project-alpha.sql'])
        cy.visit('localhost:3000/products/2')
    })

    it('updates project', () => {
        cy.get('[data-testid=Product__projects]').click()
        cy.get('[data-testid=ProjectCard__header-title]').should('have.text', 'alpha')

        cy.get('[data-testid=ProductPage__icon-inline-edit').click()
        cy.get('[data-testid=ProjectCard__button-edit]').click()
        cy.get('[data-testid=ProjectPopup__input-name]').clear().type('bravado')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=ProjectCard__header-title]').should('have.text', 'bravado')
    })

})