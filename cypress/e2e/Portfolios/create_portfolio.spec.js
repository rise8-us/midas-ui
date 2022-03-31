describe('Creates a portfolio', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql', 'support/sql/insert-users.sql'])
        cy.visit('localhost:3000/portfolios')
    })

    it('creates a new portfolio', () => {
        cy.get('[data-testid=PortfolioCard__header-title]').should('not.exist')

        cy.get('.MuiFab-root').click()
        cy.get('[data-testid=PortfolioPopup__input-name]').type('portfolio 1')
        cy.get('[data-testid=PortfolioPopup__select-products]').click()
        cy.get('li').contains('alpha product').click()

        cy.get('[data-testid=PortfolioPopup__enter-admins').type('user1')
        cy.get('li').contains('user1').click()

        cy.get('[data-testid=Table__row]').contains('user1')

        cy.get('[data-testid=Popup__button-submit]',{ timeout: 10000 }).click()

        cy.get('[data-testid="PortfolioCard__header-title-portfolio 1"]').should('have.text', 'portfolio 1')
        cy.get('[data-testid="PortfolioCard__text-productName-alpha product"]').should('have.text', 'alpha product')
    })

})