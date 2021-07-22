describe('Creates a project', () => {
    
    before(() => {
        cy.clearDB()
        cy.addLocalUserAsAdmin()
        cy.visit('localhost:3000/projects')
    })

    it('creates a new project', () => {
        cy.get('.MuiFab-root').click()

        cy.get('[data-testid=CreateOrUpdateProjectPopup__input-name]').type('yolo')
    })
})