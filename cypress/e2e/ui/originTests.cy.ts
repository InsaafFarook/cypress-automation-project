/*
Login uses a “Continue with AcmeID” button that opens an iframe from https://auth.acmeid.com. 
Inside it, the user enters credentials and is redirected back to your app at /dashboard.

Task: Show how you would:
wait for the iframe to load,
run commands in https://auth.acmeid.com using cy.origin(),
assert you land on /dashboard back in your app.
(Assume selectors: input[name="email"], input[name="password"], button[type="submit"].)
*/
describe('cy.origin() tests', () => {

   it('logs in via AcmeID (cross-origin provider in iframe)', () => {
    cy.visit('/login')

    // Trigger the SSO flow (opens/embeds the provider iframe)
    cy.contains('Continue with AcmeID').click()

    // Grab the provider iframe src
    cy.get('iframe#acmeid-frame')
        .invoke('have.attr', 'src')
        .then((src) => {
            if (!src) throw new Error('Iframe src not found')
            const providerURL = new URL(src)
            const providerOrigin = `${providerURL.protocol}//${providerURL.host}`

            // Switch to provider origin and visit the iframe URL directly
            cy.origin(providerOrigin, { args: { href: providerURL.href } }, ({ href }) => {
                cy.visit(href) // now top-level is the provider page
                cy.get('input[name="email"]').type('test@example.com')
                cy.get('input[name="password"]').type('Secret123')
                cy.get('button[type="submit"]').click()
                // provider redirects back to app after success
            })
        })

    // Back on our app origin after redirect
    cy.url().should('include', '/dashboard')
    cy.contains(/welcome/i).should('be.visible')
    })

});