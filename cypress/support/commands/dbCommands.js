/* eslint no-undef: 0 */

Cypress.Commands.add('db', (script) => {
    cy.exec(`cypress/run-sql-script.sh ${script}`)
})

Cypress.Commands.add('clearDB', () => {
    cy.db('support/sql/schema.sql')
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