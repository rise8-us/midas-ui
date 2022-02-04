describe('Delete previously existing tags', () => {
    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Tags/insert-tags.sql'])
        cy.visit('localhost:3000/tags')
    })

    it('should be able to delete a tag', () => {
        const tableRows = cy.get('[data-testid=Table__row]')

        tableRows.should('have.length', 5)
        tableRows.first().should('contain', 'CYPHER | 1')

        tableRows.first().find('[data-testid=DeleteIcon]').click()

        tableRows.first().should('not.contain', 'CYPHER | 1')
        cy.get('[data-testid=Table__row]').should('have.length', 4)
    })

    it('should delete all the tags', () => {
        cy.get('[data-testid=Table__row]').should('have.length', 4)
        
        cy.get('[data-testid=Table__row]').first().find('[data-testid=DeleteIcon]').click()
        cy.get('[data-testid=Table__row]').first().find('[data-testid=DeleteIcon]').click()
        cy.get('[data-testid=Table__row]').first().find('[data-testid=DeleteIcon]').click()
        cy.get('[data-testid=Table__row]').first().find('[data-testid=DeleteIcon]').click()
  
        cy.get('[data-testid=Table__row]').should('not.exist')
    })

})