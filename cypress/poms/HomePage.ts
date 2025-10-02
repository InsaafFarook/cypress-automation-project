export class HomePage {
  visit() {
    cy.visit(`${Cypress.config('baseUrl')}`);
  }

  verifySeachAreaIsDisplayed() {
    cy.getDataTest("username").should('be.visible');
  }
}
