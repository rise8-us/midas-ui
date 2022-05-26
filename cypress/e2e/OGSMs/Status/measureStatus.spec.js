describe('update status of measure', () => { 

    const currentDay = new Date().getDate()
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const lastDayOfMonth = new Date(year, month, 0).getDate()

    const pickDate = (day, endOfMonth) => {
        if(endOfMonth === null) {
            if(day === 1) {
                cy.get('[data-testId=ArrowLeftIcon]').click()
                cy.get('.MuiButtonBase-root').contains('15').click()
            } else {
                cy.get('.MuiButtonBase-root').contains(day - 1).click()
            }
        } else {
            if (day === endOfMonth) {
                cy.get('[data-testId=ArrowRightIcon]').click()
                cy.get('.MuiButtonBase-root').contains('15').click()
            } else {
                cy.get('.MuiButtonBase-root').contains(day + 1).click()
            }
        }
    }

    before(() => {
        cy.initDB()
        cy.addLocalUserAsAdmin()
        cy.loadSqlFiles(['e2e/OGSMs/insert-portfolio.sql','e2e/OGSMs/insert-objective.sql'])

        cy.visit('localhost:3000/products/5/overview')
        cy.get('[data-testId=LockOutlinedIcon]', { timeout: 10000 }).should('be.visible')
    })

    beforeEach(() => {
        cy.intercept({
            method: 'PUT',
            url: 'http://localhost:8000/api/measures/5',
        }).as('updateApiCheck')
    })

    it('should have on track status', () => {
        cy.get('[data-testId="LockOutlinedIcon"]').click()
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-5]').click()
        cy.get('[data-testId=MeasureCard__start-date-5]').click()

        pickDate(currentDay, null)

        cy.get('.MuiButton-root').contains('OK').click()
        cy.wait('@updateApiCheck')

        cy.get('[data-testId=MeasureCard__due-date-5]', {timeout: 10000}).should('be.visible').click()

        pickDate(currentDay, lastDayOfMonth)

        cy.get('.MuiButton-root').contains('OK').click()
    
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('ON_TRACK')
        })        
    })

    it('should be blocked status', () => {
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-5]').click()
        cy.get('[data-testId=MeasureCard__start-date-5]').click()

        pickDate(currentDay, null)

        cy.get('.MuiButton-root').contains('OK').click()
        cy.wait('@updateApiCheck')

        cy.get('[data-testId=MeasureCard__title-input-5').click()
        cy.get('[data-testId=MeasureCard__due-date-5]', {timeout: 10000}).should('be.visible').click()

        pickDate(currentDay, null)

        cy.get('.MuiButton-root').contains('OK').click()
  
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('BLOCKED')
        })     
    })

    it('should be not started when dates are removed and value is 0', () => {
        cy.get('[data-testId=MeasureCard__due-date-5]').click()
        cy.get('.MuiButton-root').contains('Clear').click()

        cy.wait('@updateApiCheck')
        cy.wait('@updateApiCheck')

        cy.get('[data-testId=MeasureCard__start-date-5]', {timeout: 10000}).click()
        cy.get('.MuiButton-root').contains('Clear').click()

        cy.wait('@updateApiCheck')

        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('NOT_STARTED')
        })
    })

    it('should be completed when checkbox is checked', () => {
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-5]').click()

        cy.get('[data-testId=MeasureCard__collapsable-card-5]').within(() => {
            cy.get('[type="checkbox"]').check()
        })
  
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('COMPLETED')
        })    

        cy.wait(2000)
        
        cy.get('[data-testId=MeasureCard__collapsable-card-5]').within(() => {
            cy.get('[type="checkbox"]').uncheck()
        })
        cy.wait('@updateApiCheck')
    })

    it('should be completed when value is equal to target', () => {
        cy.get('[data-testId=Product__objectives]').click()
        cy.get('[data-testId=MeasureCard__title-input-5]').click()

        cy.get('[data-testId=MeasureCard__collapsable-card-5]').within(() => {
            cy.get('[data-testId=ArrowDropDownIcon]', {timeout: 10000}).click()
        })
        
        cy.contains('Number').click()
        cy.wait('@updateApiCheck')
        cy.clickAndType('CompletionType__value-NUMBER', '{backspace}1')
       
        cy.wait('@updateApiCheck').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
            expect(interception.response.body.status).to.equal('COMPLETED')
        })       
    })

})