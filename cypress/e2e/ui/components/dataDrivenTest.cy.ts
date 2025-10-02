describe('Login for multiple users', () => {
  let users: Array<{email: string; password: string; name: string}> = [];

  before(() => {
    cy.fixture('users.json').then((data) => users = data);
  });

  users?.forEach((u) => {
    it(`logs in as ${u.name}`, () => {
      cy.visit('/');
      cy.get('email').type(u.email);
      cy.get('password').type(u.password);
      cy.get('login-button').click();

      cy.get('greeting').should('contain', u.name);
      cy.contains('Logout').should('be.visible');
    });
  });
});
