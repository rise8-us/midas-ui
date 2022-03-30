describe('Updates portfolio', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql', 'e2e/Portfolios/insert-portfolio.sql'])
        cy.visit('localhost:3000/portfolios')
    })

    it('updates portfolio', () => {
        cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').should('have.text', 'bravo portfolio')
        cy.get('[data-testid="PortfolioCard__text-productName-bravo product"]').should('have.text', 'bravo product')

        cy.get('[data-testid=PortfolioCard__button-edit]').click()
        cy.get('[data-testid=PortfolioPopup__input-name]').clear().type('updated portfolio')

        cy.get('[data-testid=CancelIcon]').click()

        cy.get('[data-testid=PortfolioPopup__select-products]').click()
        cy.get('li').contains('alpha product').click()

        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid="PortfolioCard__header-title-updated portfolio"]').should('have.text', 'updated portfolio')
        cy.get('[data-testid="PortfolioCard__text-productName-alpha product"]').should('have.text', 'alpha product')
        cy.get('[data-testid="PortfolioCard__text-productName-alpha product"]').should('not.have.text', 'bravo product')
    })

})