describe('Creates a portfolio', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-products.sql'])
        cy.visit('localhost:3000/portfolios')
    })

    it('creates a new portfolio', () => {
        cy.get('[data-testid=PortfolioCard__header-title]').should('not.exist')

        cy.get('.MuiFab-root').click()
        cy.get('[data-testid=CreateOrUpdatePortfolioPopup__input-name]').type('portfolio 1')
        cy.get('[data-testid=CreateOrUpdatePortfolioPopup__select-products]').click()
        cy.get('li').contains('alpha product').click()

        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=PortfolioCard__header-title]').should('have.text', 'portfolio 1')
        cy.get('[data-testid=PortfolioCard__text-productName]').should('have.text', 'alpha product')
    })

})