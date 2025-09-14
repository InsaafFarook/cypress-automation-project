/*
A 3rd-party payment widget is embedded via <iframe id="pay-frame">. 
Inside the frame there’s a Pay button that triggers a spinner in the parent page (outside the iframe) with [data-test-id="spinner"], 
then shows a success toast [role="status"] in the parent.

Task: Write a test that:
clicks Pay inside the iframe,
asserts spinner appears then disappears in the parent,
asserts the success toast text contains “Payment received”.
 */
describe('IFrame tests', ()=> {

    it('3rd Party Payement Frame', ()=> {
        cy.visit('/checkout')

        // 1) Enter the iframe and click Pay
        cy.get('iframe#pay-frame')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap)
        .find('button[data-test-id="pay"]')
        .click()

        // 2) Assert parent spinner appears, then disappears
        cy.get('[data-test-id="spinner"]').should('be.visible')
        cy.get('[data-test-id="spinner"]').should('not.exist')

        // 3) Assert success toast in parent
        cy.get('[role="status"]').should('contain.text', 'Payment received')
    });
});