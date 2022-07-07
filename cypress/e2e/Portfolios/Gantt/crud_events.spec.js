describe('CRUD events', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.clock(currentDate)
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql'])
        cy.visitBravoPortfolio()
    })

    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/gantt_events'
        }).as('createEvent')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_events/*'
        }).as('updateEvent')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/gantt_events/*'
        }).as('deleteEvent')
    })

    it('should create a new event', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()
        cy.get('[data-testId=GanttAddNewItem__button]').click()
        cy.get('[data-testId=MoreOptionsPopperMenu__Event]').click()

        cy.get('[data-testId=EventPopup__input-title]').click().type('eventTitle')
        cy.get('[data-testId=EventPopup__input-description]').click().type('eventDescription')
        cy.get('p').contains('MMM dd yyyy').first().click()
        cy.get('.MuiPickersDay-root').contains('1').click()
        cy.get('p').contains('MMM dd yyyy').last().click()
        cy.get('.MuiPickersDay-root').contains('30').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@createEvent').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('b').contains('eventTitle').should('be.visible')
        cy.get('p').contains('01 - 30 Jan 2000').should('be.visible')
    })

    it('should update an existing event', () => {

        cy.get('b').contains('eventTitle').trigger('mouseover').wait(1000)
        cy.get('[data-testId=GanttActionButtons__edit]').click()

        cy.get('[data-testId=EventPopup__input-title]').click().type('{selectall}').type('newEventTitle')
        cy.get('[data-testId=EventPopup__input-description]').click().type('{selectall}').type('newEventDescription')
        cy.get('p').contains('Jan 01, 2000').first().click()
        cy.get('.MuiPickersDay-root').contains('2').click()
        cy.get('p').contains('Jan 30, 2000').last().click()
        cy.get('.MuiPickersDay-root').contains('29').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateEvent').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('b').contains('newEventTitle').should('be.visible')
        cy.get('p').contains('02 - 29 Jan 2000').should('be.visible')
    })

    it('should delete an existing event', () => {

        cy.get('b').contains('newEventTitle').trigger('mouseover').wait(1000)
        cy.get('[data-testId=GanttActionButtons__delete]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@deleteEvent').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttEntry__wrap]').should('not.exist')
    })
})