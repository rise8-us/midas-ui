describe('CRUD milestones', () => {
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
            url: 'http://localhost:8000/api/gantt_milestones'
        }).as('createMilestone')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_milestones/*'
        }).as('updateMilestone')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/gantt_milestones/*'
        }).as('deleteMilestone')
    })

    it('should create a new milestone', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()
        cy.get('[data-testId=GanttAddNewItem__button]').click()
        cy.get('[data-testId=MoreOptionsPopperMenu__Milestone]').click()

        cy.get('[data-testId=MilestonePopup__input-title]').click().type('milestoneTitle')
        cy.get('[data-testId=MilestonePopup__input-description]').click().type('milestoneDescription')
        cy.get('p').contains('MMM dd yyyy').click()
        cy.get('.MuiPickersDay-root').contains('20').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@createMilestone').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('b').contains('milestoneTitle').should('be.visible')
        cy.get('p').contains('20 Jan 2000').should('be.visible')
    })

    it('should update an existing milestone', () => {

        cy.get('b').contains('milestoneTitle').trigger('mouseover').wait(1000)
        cy.get('[data-testId=GanttActionButtons__edit]').click()

        cy.get('[data-testId=MilestonePopup__input-title]').click().type('{selectall}').type('newMilestoneTitle')
        cy.get('[data-testId=MilestonePopup__input-description]').click().type('{selectall}').type('newMilestoneDescription')
        cy.get('p').contains('Jan 20, 2000').click()
        cy.get('.MuiPickersDay-root').contains('15').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateMilestone').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('b').contains('newMilestoneTitle').should('be.visible')
        cy.get('p').contains('15 Jan 2000').should('be.visible')
    })

    it('should delete an existing milestone', () => {

        cy.get('b').contains('newMilestoneTitle').trigger('mouseover').wait(1000)
        cy.get('[data-testId=GanttActionButtons__delete]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@deleteMilestone').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttEntry__wrap]').should('not.exist')
    })
})