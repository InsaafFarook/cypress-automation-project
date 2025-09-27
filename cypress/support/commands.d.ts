/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Get element by data-test-id
     * @example cy.getByTestId('login-button')
     */
    getByTestId(id: string): Chainable;
    getDataTest(id: string): Chainable;
  }
}

export {};
