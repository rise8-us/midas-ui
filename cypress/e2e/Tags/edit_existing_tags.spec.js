describe('Edit previously existing tags', () => {
    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Tags/insert-tags.sql'])
        cy.visit('localhost:3000/tags')
    })

    it('should be able to edit a tag', () => {
        cy.get('[data-testid=Table__row]').first().should('contain', 'CYPHER | 1')
        cy.get('[data-testid=Table__row]').first().should('contain', 'Beep boop code.')
        cy.get('[data-testid=Table__row]').first().should('contain', 'PORTFOLIO')
        cy.get('[data-testid=Table__row]').first().should('contain', '#ffeb3b')
        cy.get('[data-testid=EditIcon]').first().click()
        cy.get('[data-testid=TagPopup__input-label]').find('input').clear().click().type('DE-CYPHER::2')
        cy.get('[data-testid=TagPopup__input-description]').find('textarea').first().clear().click().type('New and improved.')
        cy.get('[data-testid=ArrowDropDownIcon]').click()
        cy.get('div[role=presentation]').contains('PROJECT').click()
        cy.get(`div[title="#607d8b"]`).click()
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=Table__row]').first().should('contain', 'DE-CYPHER | 2')
        cy.get('[data-testid=Table__row]').first().should('contain', 'New and improved.')
        cy.get('[data-testid=Table__row]').first().should('contain', 'PROJECT')
        cy.get('[data-testid=Table__row]').first().should('contain', '#607d8b')
    })
})