describe('Creates a new tag', () => {
    const tags = [
        {
            label: 'This is my label.',
            description: 'This is my desc.',
            type: 'PRODUCT',
            color: 'e91e63'
        },
        {
            label: 'This is yet another label',
            priority: 1,
            description: 'This is yet another desc.',
            type: 'PROJECT',
            color: '3f51b5'
        }
    ]
    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.visit('localhost:3000/tags')
    })


    it('create a new tag typing out a color', () => {

        cy.get('[data-testid=Table__row]').should('not.exist')
        cy.get('button').contains('Add New Tag').click()
        cy.get('[data-testid=TagPopup__input-label]').find('input').click().type(tags[0].label)
        cy.get('[data-testid=TagPopup__input-description]').find('textarea').first().click().type(tags[0].description)
        cy.get('[data-testid=ArrowDropDownIcon]').click()
        cy.get('div[role=presentation]').contains(tags[0].type).click()
        cy.get('[data-testid=ColorPicker__input-color]').find('input').last().click().type(tags[0].color)
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('[data-testid=Table__row]').should('contain', tags[0].label)
    })

    it('should create new scoped tag using color picker', () => {
        cy.get('[data-testid=Table__row]').should('exist')

        cy.get('button').contains('Add New Tag').click()
        cy.get('[data-testid=TagPopup__input-label]').find('input').click().type(tags[1].label + '::' + tags[1].priority)
        cy.get('[data-testid=TagPopup__input-description]').find('textarea').first().click().type(tags[1].description)
        cy.get('[data-testid=ArrowDropDownIcon]').click()
        cy.get('div[role=presentation]').contains(tags[1].type).click()
        cy.get(`div[title="#${tags[1].color}"]`).click()
        
        cy.get('[data-testid=ColorPicker__input-color]').find('input').last().should('have.value',`#${tags[1].color}`)
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.get('tr[data-testid=Table__row]').next().should('contain', `${tags[1].label} | ${tags[1].priority}`)
        cy.get('[data-testid=Table__row]').should('have.length', tags.length)
    })
})