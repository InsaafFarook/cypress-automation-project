export class HomePage {
  visit() {
    cy.visit(`${Cypress.config('baseUrl')}`);
  }

  verifySeachAreaIsDisplayed() {
    return cy.get("[name='q']").should('be.visible');
  }
}
