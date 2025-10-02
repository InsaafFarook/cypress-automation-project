// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************


import 'cypress-axe';   // adds cy.injectAxe, cy.checkA11y, cy.configureAxe

// Import commands.js using ES2015 syntax:
import './commands'

import 'cypress-xpath'

import 'cypress-real-events/support'

Cypress.on('uncaught:exception', (err) => {
  // Only swallow the generic cross-origin error
  if (err && /Script error\.?/.test(err.message || '')) {
    return false;  // prevent Cypress from failing the test
  }
  // Let other errors fail the test
});