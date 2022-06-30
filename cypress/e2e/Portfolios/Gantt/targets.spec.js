describe('CRUD targets', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql'])

        cy.visit('localhost:3000/portfolios/4')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/gantt_targets'
        }).as('createTarget')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_targets/*'
        }).as('updateTarget')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/gantt_targets/*'
        }).as('deleteTarget')

        cy.clock(currentDate)

        cy.get('[data-testId=Portfolio__sprint-report]').click()
        cy.get('[data-testId=Portfolio__roadmap]').click()
    })

    it('should create a new target', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()
        cy.get('[data-testId=GanttAddNewItem__button]').click()
        cy.get('[data-testId=MoreOptionsPopperMenu__Target]').click()


        cy.get('[data-testId=TargetPopup__input-title]').click().type('targetTitle')
        cy.get('[data-testId=TargetPopup__input-description]').click().type('targetDescription')
        cy.get('p').contains('MMM dd yyyy').first().click()
        cy.get('.MuiPickersDay-root').contains('1').click()
        cy.get('p').contains('MMM dd yyyy').last().click()
        cy.get('.MuiPickersDay-root').contains('30').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@createTarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('b').contains('targetTitle').should('be.visible')
        cy.get('p').contains('01 - 30 Jan 2000').should('be.visible')
    })

    it('should update an existing target', () => {
        cy.get('[data-testId=ExpandMoreIcon]').click()
        cy.get('[data-testId=GanttActionButtons__edit]').click()

        cy.get('[data-testId=TargetPopup__input-title]').click().type('{selectall}').type('newTargetTitle')
        cy.get('[data-testId=TargetPopup__input-description]').click().type('{selectall}').type('newTargetDescription')
        
        cy.get('p').contains('Jan 01, 2000').first().click()
        cy.get('.MuiPickersDay-root').contains('2').click()
        cy.get('p').contains('Jan 30, 2000').last().click()
        cy.get('.MuiPickersDay-root').contains('29').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateTarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })
        
        cy.get('[data-testId=ExpandMoreIcon]').click()

        cy.get('b').contains('newTargetTitle').should('be.visible')
        cy.get('p').contains('02 - 29 Jan 2000').should('be.visible')
    })

    it('should delete an existing target', () => {
        cy.get('[data-testId=ExpandMoreIcon]').click()
        cy.get('[data-testId=GanttActionButtons__delete]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@deleteTarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttEntry__wrap]').should('not.exist')
    })
})