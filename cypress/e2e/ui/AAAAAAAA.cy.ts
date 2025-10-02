describe('Sample testing', () => {


    it('Test', ()=> {
        cy.visit('https://demoqa.com/alerts')

        cy.on('window:alert', (msg) => {
            expect(msg).eq('You clicked a button')
        })
        cy.get('#alertButton').click()

        let alertStub = cy.stub()
        cy.on('window:alert', alertStub)
        cy.clock()
        cy.get('#timerAlertButton').click()
        cy.tick(3000)
        cy.wrap(alertStub).should('not.have.been.called')

        cy.tick(2000)
        cy.wrap(alertStub).should('have.been.called')

        cy.on('window:confirmButton', (msg) => {
            expect(msg).eq('Do you confirm action')
        })
        cy.on('window:confirm', () => true)
        cy.get('#confirmButton').click()
        cy.get('#confirmResult').should('contain', 'Ok')

        cy.window().then((win)=>{
            cy.stub(win, 'prompt').returns("Ronaldo")
        })
        cy.get('#promtButton').click()

        cy.get('#promptResult').should('have.text', 'Ronaldo')
       
    })
})