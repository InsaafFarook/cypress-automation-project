import { HomePage } from "../../poms/HomePage";

describe("Home Smoke", () => {
  const home = new HomePage();

  it('has no detectable a11y violations on load', () => {
    cy.visit('/');
    cy.injectAxe();          // inject axe-core into the page
    cy.checkA11y();          // fails test if violations are found
  });

  it("loads the homepage and shows header", () => {
    home.visit();
    home.verifySeachAreaIsDisplayed();
  });
  
  it('logs in with fixture data', () => {
    cy.fixture('users.json').then((user) => {
      cy.visit('/login')
      cy.get('[data-test-id="username"]').type(user.email)
      cy.get('[data-test-id="password"]').type(user.password)
      cy.get('[data-test-id="login-btn"]').click()
      cy.url().should('include', '/dashboard')
    })
  })

  it('Get /Users', ()=> {
    cy.intercept('GET', '/users', {fixture: 'users.stub.json'}).as('users')
    cy.visit('/users-page')
    cy.wait('@users').its('response.statusCode').should('eq', 200)
    cy.get('[data-row]').should('have.length', 3)
  });

  it('logs in via third-party iframe', () => {
    cy.visit('https://app.example.com/login')

    // Wait for iframe to load
    cy.get('iframe#auth-frame')
      .its('0.contentWindow.origin')
      .should('eq', 'https://auth.example.com')

    // Switch to that origin
    cy.origin('https://auth.example.com', () => {
      cy.get('input[name="email"]').type('test@example.com')
      cy.get('input[name="password"]').type('Secret123')
      cy.get('button[type="submit"]').click()
      cy.contains('Welcome').should('be.visible')
    })

    // Back to original origin — can assert app shows logged-in state
    cy.contains('Dashboard').should('be.visible')
  })
});
