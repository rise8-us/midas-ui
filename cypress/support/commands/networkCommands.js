/* eslint no-undef: 0 */

Cypress.Commands.add('successfulResponse', (alias) => {
    cy.wait(alias).its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('waitRequest', (method, uri) => {
    cy.wait(cy.intercept(method, uri)).its('response.statusCode').should('eq', 200)
})

Cypress.Commands.add('waitAppLoads', () => {
    cy.successfulResponse('@get_portfolios')
    cy.successfulResponse('@get_products')
    cy.successfulResponse('@get_projects')
    cy.successfulResponse('@get_sourceControl')
    cy.successfulResponse('@get_tags')
    cy.successfulResponse('@get_teams')
})

Cypress.Commands.add('visitBravoPortfolio', (tab = null) => {
    cy.visit('localhost:3000/portfolios')
    cy.waitAppLoads()

    cy.get('[data-testid="PortfolioCard__header-title-bravo portfolio"]').click()
    if (tab) cy.get(`[data-testid=Portfolio__${tab}]`).click()
})

Cypress.Commands.add('visitAlphaProduct', (tab = null) => {
    cy.visit('localhost:3000/products')
    cy.waitAppLoads()

    cy.get('[data-testid=ProductCard__header-title]').contains('alpha product').click()
    if (tab) cy.get(`[data-testid=Product__${tab}]`).click()
})

Cypress.Commands.add('aliasIntercepts', () => {
    cy.intercept('GET', '/api/init').as('get_init')

    // Capbilities api
    cy.intercept('GET', '/api/capabilities',).as('get_capabilities')
    cy.intercept('PUT', '/api/capabilities/*',).as('put_capability')
    cy.intercept('POST', '/api/capabilities',).as('post_capability')

    // Product api
    cy.intercept('GET', '/api/products').as('get_products')

    // Portfolio api
    cy.intercept('GET', '/api/portfolios').as('get_portfolios')
    cy.intercept('PUT', '/api/portfolios/*').as('put_portfolio')
    cy.intercept('POST', '/api/portfolios').as('post_portfolio')
    cy.intercept('GET', '/api/portfolios?search=*').as('get_portfolios-search')
    cy.intercept('PUT', '/api/portfolios/*/archive').as('put_portfolio-archive')
    cy.intercept('GET', '/api/portfolios/*/sprint-metrics/*-*-*').as('get_portfolio-sprint-metrics')
    cy.intercept('GET', '/api/portfolios/*/sprint-metrics/summary?*').as('get_portfolio-sprint-metrics-summary')

    // Project api
    cy.intercept('GET', '/api/projects').as('get_projects')

    // Source Control api
    cy.intercept('GET', '/api/sourceControls').as('get_sourceControl')

    // Tags api
    cy.intercept('GET', '/api/tags').as('get_tags')

    // Teams api
    cy.intercept('GET', '/api/teams').as('get_teams')

})

