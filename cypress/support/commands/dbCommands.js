/* eslint no-undef: 0 */

Cypress.Commands.add('db', (script) => {
    cy.exec(`cypress/run-sql-script.sh ${script}`)
})

Cypress.Commands.add('initDB', () => {
    cy.db('support/sql/schema.sql')
    cy.db('support/sql/initialize.sql')
    cy.aliasIntercepts()
})

Cypress.Commands.add('addLocalUserAsAdmin', () => {
    cy.db('support/sql/insert-localuser-as-admin.sql')
})

Cypress.Commands.add('loadSqlFiles', (sqlTestDataFilePath) => {
    if (sqlTestDataFilePath) {
        sqlTestDataFilePath.forEach(file => {
            cy.db(file)
        })
    }
})