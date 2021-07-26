describe('Updates portfolio', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Portfolios/insert-portfolio.sql'])
        cy.visit('localhost:3000/portfolios')
    })

    it('updates portfolio', () => {
        cy.get('[data-testid=PortfolioCard__header-title]').should('have.text', 'alpha portfolio')
        cy.get('[data-testid=PortfolioCard__text-productName]').should('have.text', 'alpha product')

        cy.get('[data-testid=PortfolioCard__button-edit]').click()
        cy.get('[data-testid=CreateOrUpdatePortfolioPopup__input-name]').clear().type('updated portfolio')

        cy.get('[data-testid=CreateOrUpdatePortfolioPopup__select-products]').click()
        cy.get('li').contains('alpha product').click()

        cy.get('[data-testid=CreateOrUpdatePortfolioPopup__select-products]').click()
        cy.get('li').contains('bravo product').click()


        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=PortfolioCard__header-title]').should('have.text', 'updated portfolio')
        cy.get('[data-testid=PortfolioCard__text-productName]').should('not.have.text', 'alpha product')
        cy.get('[data-testid=PortfolioCard__text-productName]').should('have.text', 'bravo product')
    })

})