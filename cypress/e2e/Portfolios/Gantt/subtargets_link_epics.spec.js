describe('CRUD subtarget linking epics', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql','e2e/Portfolios/Gantt/gantt-insert-subtargets.sql','e2e/Portfolios/Gantt/gantt-insert-epics.sql'])

        cy.visit('localhost:3000/portfolios/4')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_targets/*'
        }).as('updateTarget')

        cy.clock(currentDate)

        cy.get('[data-testId=Portfolio__sprint-report]').click()
        cy.get('[data-testId=Portfolio__roadmap]').click()
    })

    it('should find product epics', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()

        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttSubTarget__associate-epic]').first().click()
        
        cy.get('input[placeholder="Link epics by title or product name"]').click()

        cy.get('li').should('have.length', 4) //there is always one empty li item at the start

    })

})