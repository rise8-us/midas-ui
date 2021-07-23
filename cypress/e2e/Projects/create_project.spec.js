describe('Creates a project', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.visit('localhost:3000/projects')
    })

    it('creates a new project', () => {
        cy.get('[data-testid=ProjectCard__header-title]').should('not.exist')

        cy.get('.MuiFab-root').click()
        cy.get('[data-testid=CreateOrUpdateProjectPopup__input-name]').type('project 1')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=ProjectCard__header-title]').should('have.text', 'project 1')
    })

})