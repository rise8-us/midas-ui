/* eslint no-undef: 0 */

Cypress.Commands.add('clickAndType', (testIdName, text) => {
    cy.get(`[data-testid=${testIdName}]`).click()
    cy.get(`[data-testid=${testIdName}]`).type(text)
})