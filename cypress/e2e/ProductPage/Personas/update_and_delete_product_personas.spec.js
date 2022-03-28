describe('Updates and deletes a products persona', () => {

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/Products/insert-product-alpha.sql', 'e2e/ProductPage/insert-product-personas.sql'])
    })

    beforeEach(() => {
        cy.visit('localhost:3000/products/2/overview')
        cy.get('[data-testid=ProductPage__icon-inline-edit]', { timeout: 10000 }).should('be.visible')
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/personas/1',
        }).as('updateApiCheck')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/personas/1',
        }).as('deleteApiCheck')

        cy.reload()
    })

    it('updates persona name', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.clickAndType('"Alpha persona"', 'Beta persona')

        cy.get('[data-testid=ProductDetails__mission-statement]').click()

        cy.get('[data-testid="Alpha persona"]').should('not.exist')
        cy.get('[data-testid="Beta persona"]').should('exist')

        cy.wait('@updateApiCheck').then((interception) => {
            console.log(interception)
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.title).to.equal('Beta persona')
        })
    })

    it('updates persona supported', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.get('[data-testid="Beta persona"]').trigger('mouseover')
        
        cy.get('[data-testid=RadioButtonUncheckedOutlinedIcon]').should('exist')
        cy.get('[data-testid=RadioButtonUncheckedOutlinedIcon]').click()

        
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.isSupported).to.equal(true)
        })
        
        cy.get('[data-testid=RadioButtonUncheckedOutlinedIcon]').should('not.exist')
        cy.get('[data-testid=CheckCircleOutlinedIcon]').should('exist')
        
        cy.reload()

        cy.get('[data-testid=PersonaEntry__icon-person]').should('have.css', 'color', 'rgb(212, 175, 55)')
    })

    it('updates persona tooltip', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.get('[data-testid="Beta persona"]').trigger('mouseover')
        
        cy.get('[data-testid=PersonaEntry__button-info]').should('exist')
        cy.get('[data-testid=PersonaEntry__button-info]').click()

        cy.clickAndType('SingleFieldPopup__input', 'Test tooltip')

        cy.get('body').click(0,0)

        cy.get('[data-testid=SingleFieldPopup__input]').contains('Test tooltip')
        cy.get('[data-testid=Popup__button-submit]').click()

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.description).to.equal('Test tooltip')
        })

        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.get('[data-testid="Beta persona"]').trigger('mouseover')
        cy.get('[data-testid="Test tooltip"]').contains('Test tooltip')
    })

    it('deletes persona', () => {
        cy.get('[data-testid=ProductPage__icon-inline-edit]').click()

        cy.get('[data-testid="Beta persona"]').trigger('mouseover')

        cy.get('[data-testid=DraggableRow__button-delete]').click()

        cy.get('[data-testid="Beta persona"]').should('not.exist')

        cy.wait('@deleteApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    })

})