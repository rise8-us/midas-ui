// describe('CRUD subtarget linking epics', () => {
//     const currentDate = new Date('2000-01-05')

//     before(() => {
//         cy.initDB()
//         cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql','e2e/Portfolios/Gantt/gantt-insert-subtargets.sql','e2e/Portfolios/Gantt/gantt-insert-epics.sql'])
//         cy.visitBravoPortfolio()
//     })

//     beforeEach(() => {
//         cy.intercept({
//             method: 'PUT',
//             url: 'http://localhost:8000/api/gantt_targets/*'
//         }).as('updateTarget')

//         cy.clock(currentDate)
//     })
    
//     it('should find product epics', () => {
//         cy.get('[data-testId=Portfolio__sprint-report]').click()
//         cy.get('[data-testId=Portfolio__roadmap]').click()

//         cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()

//         cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
//         cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
//         cy.get('[data-testId=GanttSubTarget__associate-epic]').first().click()

//         // cy.get('[data-testid="CollapsableRow__stack-bravo portfolio"]').click()
//         cy.get('[data-testid=Collapsable__card]').click()

//         cy.wait(2000)
//         // cy.get('[data-testid=Collapsable__card]').next().click()
//         // cy.get('[data-testid=CollapsableRow__expandButton_closed]').click()

//         cy.get('[data-testid=EpicListItem__checkbox-unchecked]').first().click()
        
//         cy.wait('@updateTarget').then((interception) => {
//             expect(interception.response.statusCode).to.equal(200)
//         })
//     })

// })