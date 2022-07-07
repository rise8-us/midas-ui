describe('Target and Subtarget progress', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql','e2e/Portfolios/Gantt/gantt-insert-subtargets.sql','e2e/Portfolios/Gantt/gantt-insert-epics.sql', 'e2e/Portfolios/Gantt/gantt-link-epics.sql'])
        cy.visitBravoPortfolio()
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
    
    it('should show target progress', () => {
        cy.get('[data-testId=Portfolio__sprint-report]').click()
        cy.get('[data-testId=Portfolio__roadmap]').click()

        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()

        cy.get('[data-testId=GanttTarget__target-progress]').first().within(() => {
            expect(cy.get('span').last().contains('72%'))
        })

        cy.get('[data-testId=GanttTarget__target-progress]').last().within(() => {
            expect(cy.get('span').last().contains('33%'))
        })
    })

    it('should show subtarget progress', () => {
        cy.get('[data-testId=GanttTarget__expandButton_closed]').click({ multiple: true })

        cy.get('[data-testId=GanttEntry__wrap]').first().within(() => {
            cy.get('[data-testId=GanttSubtarget__subtarget-progress]').first().within(() => {
                expect(cy.get('span').last().contains('37%'))
            })
            cy.get('[data-testId=GanttSubtarget__subtarget-progress]').last().within(() => {
                expect(cy.get('span').last().contains('100%'))
            })
        })

        cy.get('[data-testId=GanttEntry__wrap]').last().within(() => {
            cy.get('[data-testId=GanttSubtarget__subtarget-progress]').within(() => {
                expect(cy.get('span').last().contains('33%'))
            })
        })
        
    })
})