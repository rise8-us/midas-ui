describe('Gantt Chart Navigation', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql', 'e2e/Portfolios/Gantt/gantt-insert-target.sql'])
        cy.visitBravoPortfolio()
    })

    beforeEach(() => {
        cy.clock(currentDate)

        cy.get('[data-testId=Portfolio__sprint-report]').click()
        cy.get('[data-testId=Portfolio__roadmap]').click()
    })

    it('should navigate left on the gantt chart 6M view', () => {
        cy.get('[data-testId=GanttActionBar__button-left-Button]').click()
        cy.get('[data-testId=GanttHeader__column-0]').contains('Oct')
    })

    it('should navigate right on the gantt chart 6M view', () => {
        cy.get('[data-testId=GanttActionBar__button-right-Button]').click()
        cy.get('[data-testId=GanttHeader__column-5]').contains('May')
    })

    it('should navigate left on the gantt chart 1YR view', () => {
        cy.get('[data-testId=GanttView__button-scope-1YR]').click()
        cy.get('[data-testId=GanttActionBar__button-left-Button]').click()
        cy.get('[data-testId=GanttHeader__column-0]').contains('Aug')
    })

    it('should navigate right on the gantt chart 1YR view', () => {
        cy.get('[data-testId=GanttView__button-scope-1YR]').click()
        cy.get('[data-testId=GanttActionBar__button-right-Button]').click()
        cy.get('[data-testId=GanttHeader__column-11]').contains('Sep')
    })

    it('should navigate left on the gantt chart 3YR view', () => {
        cy.get('[data-testId=GanttView__button-scope-3YR]').click()
        cy.get('[data-testId=GanttActionBar__button-left-Button]').click()
        cy.get('[data-testId=GanttHeader__column-0]').contains('1998')
    })

    it('should navigate right on the gantt chart 3YR view', () => {
        cy.get('[data-testId=GanttView__button-scope-3YR]').click()
        cy.get('[data-testId=GanttActionBar__button-right-Button]').click()
        cy.get('[data-testId=GanttHeader__column-2]').contains('2002')
    })

})