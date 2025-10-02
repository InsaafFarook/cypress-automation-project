describe('Alerts Test', ()=>{

    beforeEach("Load Url", ()=>{
        cy.visit("https://demoqa.com/alerts")
    })

    it("Alerts", ()=> {
        cy.on('window:alert', (msg) => {
            expect(msg).to.be.eq('You clicked a button')
        })
        cy.get('#alertButton').click()
    })

    it("Alerts After 5 Secs", ()=> {
        const alertStub = cy.stub()
        cy.on('window:alert', alertStub)

        cy.clock()
        cy.get('#timerAlertButton').click()
        cy.tick(3000)
        cy.wrap(alertStub).should('not.have.been.called')

        cy.tick(2000)
        cy.wrap(alertStub).should('have.been.calledOnceWith', 'This alert appeared after 5 seconds')
    })

    it("Alerts Confrim", ()=> {
        cy.on('window:confirm', (msg) => {
            expect(msg).to.be.eq('Do you confirm action?')
        })
        cy.on('window:confirm', () => true);
        cy.get('#confirmButton').click()
        cy.get('#confirmResult').should('contain.text', 'Ok')
    })

    it("Alerts Confrim", ()=> {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns("Ronaldo")
        })
        cy.get('#promtButton').click()
        cy.get('#promptResult').should('contain.text', 'Ronaldo') 
    })
})