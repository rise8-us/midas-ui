describe('CRUD subtarget priorities', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql','e2e/Portfolios/Gantt/gantt-insert-subtargets.sql'])

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

    it('should make toggle subtarget priority', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()

        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttSubTarget__priority]').first().click()
        
        cy.wait('@updateTarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })
        
        cy.get('[data-testId=StarRoundedIcon]').first().should('have.css', 'color', 'rgb(212, 175, 55)')
        cy.get('[data-testId=StarRoundedIcon]').last().should('have.css', 'color', 'rgb(129, 139, 152)')

    })

    it('should filter subtarget priorities', () => {
        cy.get('[data-testId=LockOpenOutlinedIcon]', { timeout: 1000 }).click()

        cy.get('[data-testId=GanttTarget__expandButton_closed]').click({ multiple: true })
        cy.get('[data-testId=GanttFilter__button]').click()
        cy.get('[data-testId=TooltipOptions__checkbox-0]').click()
        
        cy.get('[data-testId=StarRoundedIcon]').first().should('be.visible')
        cy.get('[data-testId=StarRoundedIcon]').should('have.length', 1)
    })

})