describe("Frames Tests", () => {

    it("Ifram Testing", () => {
        cy.visit("https://demoqa.com/frames")
        cy.get('#frame1')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap).as('frame1Body')

        cy.get('@frame1Body').find('#sampleHeading').should('have.text', 'This is a sample page')
    })

    it('Nested Frames', () => {
        cy.visit('https://demoqa.com/nestedframes')
        cy.get('#frame1')
            .its('0.contentDocument.body')
            .should('not.be.empty')
            .then(cy.wrap).as('frame1Body')

        cy.get('@frame1Body').xpath('//body[text()="Parent frame"]').should('be.visible')
        cy.get('@frame1Body').xpath('//iframe[@srcdoc="<p>Child Iframe</p>"]')
        .its('0.contentDocument.body').should('not.be.empty').then(cy.wrap).as('childFrameBody')
        
        cy.get('@childFrameBody').xpath('//p[text()="Child Iframe"]').should('be.visible')
    })
})