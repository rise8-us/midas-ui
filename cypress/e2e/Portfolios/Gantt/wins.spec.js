describe('CRUD wins', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.clock(currentDate)
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql'])

        cy.visit('localhost:3000/portfolios/4')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/gantt_wins'
        }).as('createWin')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_wins/*'
        }).as('updateWin')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/gantt_wins/*'
        }).as('deleteWin')
    })

    it('should create a new win', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()
        cy.get('[data-testId=GanttAddNewItem__button]').click()
        cy.get('[data-testId=MoreOptionsPopperMenu__Win]').click()


        cy.get('[data-testId=WinPopup__input-title]').click().type('winTitle')
        cy.get('p').contains('MMM dd yyyy').click()
        cy.get('.MuiPickersDay-root').contains('20').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@createWin').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })
        
        cy.wait(1000)

        cy.get('[data-testId=GanttEntry__wrap]').should('exist')
    })

    it('should update an existing win', () => {
        cy.get('[data-testId=GanttEntry__wrap]').within(() => {
            cy.get('path').trigger('mouseover')
            cy.wait(1000)
        })
        cy.get('[data-testId=GanttActionButtons__edit]').click()

        cy.get('[data-testId=WinPopup__input-title]').click().type('{selectall}').type('newWinTitle')
        cy.get('p').contains('Jan 20, 2000').click()
        cy.get('.MuiPickersDay-root').contains('15').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateWin').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })
        cy.get('[data-testId=GanttEntry__wrap]').within(() => {
            cy.get('path').trigger('mouseover')
            cy.wait(1000)
        })
        cy.get('h6').contains('newWinTitle').should('be.visible')
    })

    it('should delete an existing win', () => {
        cy.get('[data-testId=GanttEntry__wrap]').within(() => {
            cy.get('path').trigger('mouseover')
            cy.wait(1000)
        })
        cy.get('[data-testId=GanttActionButtons__delete]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@deleteWin').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttEntry__wrap]').should('not.exist')
    })
})