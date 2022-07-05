describe('CRUD subtargets', () => {
    const currentDate = new Date('2000-01-05')

    before(() => {
        cy.initDB()
        cy.loadSqlFiles(['e2e/Portfolios/Gantt/gantt-setup.sql','e2e/Portfolios/Gantt/gantt-insert-target.sql','e2e/Portfolios/Gantt/gantt-insert-requirement.sql'])

        cy.visit('localhost:3000/portfolios/4')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'POST',
            url: 'http://localhost:8000/api/gantt_targets'
        }).as('createSubtarget')

        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/gantt_targets/*'
        }).as('updateSubtarget')

        cy.intercept({
            method: 'DELETE',
            url: 'http://localhost:8000/api/gantt_targets/*'
        }).as('deleteSubtarget')

        cy.clock(currentDate)
        cy.get('[data-testId=Portfolio__sprint-report]').click()
        cy.get('[data-testId=Portfolio__roadmap]').click()
    })

    it('should create a sub-target', () => {
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).click()

        cy.get('[data-testId=ExpandMoreIcon]').click()
        cy.wait(1000)
        cy.get('[data-testId=GanttTarget__createSubTarget_button]').click()

        cy.wait('@createSubtarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })
        cy.wait(1000)

        cy.get('[data-testId=GanttSubTarget__title]').should('exist')
    })

    it('should update an existing subtarget', () => {
        cy.get('[data-testId=GanttTarget__expandButton_open]').click()
        cy.wait(1500)
        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttSubTarget__title]').click().type('subtargetTitle{enter}')

        cy.wait('@updateSubtarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttSubTarget__title]').trigger('mouseover').within(() => {
            cy.get('[data-testId=GanttActionButtons__edit]').click()
        })

        cy.get('[data-testId=TargetPopup__input-title]').click().type('{selectAll}newSubtargetTitle')
        cy.get('[data-testId=TargetPopup__input-description]').click().type('{selectAll}newSubtargetTitle')
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.get('[data-testId=GanttSubTarget__title]').within(() => {
            cy.get('input').should('have.value', 'newSubtargetTitle')
        })
    })

    it('should link an existing requirement', () => {
        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttSubTarget__associate-req]').click()
        cy.get('[data-testId=AssociateRequirementsPopup__checkbox-0]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateSubtarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttRequirements__tooltip]').should('exist')

    })

    it('should unlink a linked requirement', () => {
        cy.get('[data-testId=GanttTarget__expandButton_closed]').first().click()
        cy.get('[data-testId=GanttRequirementsList__edit-button]').click()
        cy.get('[data-testId=AssociateRequirementsPopup__checkbox-0]').click()
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.wait('@updateSubtarget').then(res => {
            expect(res.response.statusCode).to.equal(200)
        })

        cy.get('[data-testId=GanttRequirements__tooltip]').should('not.exist')
    })

    it('should delete an existing subtarget', () => {
        cy.get('[data-testId=GanttSubTarget__title]').within(() => {
            cy.get('input').trigger('mouseover')
            cy.get('[data-testId=GanttActionButtons__delete]').click()
        })
        cy.get('[data-testId=Popup__button-submit]').click()

        cy.get('[data-testId=GanttSubTarget__title]').should('not.exist')
    })
})
