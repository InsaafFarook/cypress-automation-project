/*
    Your app loads /api/orders on the Orders page and:
    shows a table when the call succeeds,
    shows an inline error banner when the API returns 500,
    shows an empty state when the API returns 200 with [].
    Task: Write three short tests (success, empty, error) using cy.intercept() that:
    visit /orders,
    wait for the request,
    assert the correct UI state for each case.
    */
describe('Orders page network states', () => {
  it('Success: renders table with 3 rows', () => {
    cy.intercept('GET', '/api/orders', { fixture: 'orders.success.json' }).as('getOrders')

    cy.visit('/orders')

    cy.wait('@getOrders')
      .its('response.body')
      .should('have.length', 3)

    cy.get('[data-row]').should('have.length', 3)
  })

  it('Empty: shows empty state', () => {
    cy.intercept('GET', '/api/orders', {
      statusCode: 200,
      body: [], // explicit empty list
      headers: { 'content-type': 'application/json' }
    }).as('getOrdersEmpty')

    cy.visit('/orders')

    cy.wait('@getOrdersEmpty').its('response.statusCode').should('eq', 200)
    cy.get('[data-row]').should('have.length', 0)
    cy.get('[data-test-id="empty-state"]').should('be.visible')
  })

  it('Error: shows inline error banner', () => {
    cy.intercept('GET', '/api/orders', {
      statusCode: 500,
      body: { error: 'Server Error' },
      headers: { 'content-type': 'application/json' }
    }).as('getOrdersErr')

    cy.visit('/orders')

    cy.wait('@getOrdersErr').its('response.statusCode').should('eq', 500)
    cy.get('[data-test-id="orders-error"]').should('be.visible')
      .and('contain.text', 'something went wrong') // adjust to your app copy
  })
})
