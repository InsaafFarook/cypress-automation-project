describe('Day 3 Tests', () =>{
    
    beforeEach('Load URL', ()=>{
        cy.visit('https://demoqa.com/')
        cy.contains('Widgets').click()
    })

    it('Accordion', ()=> {
        cy.contains('Accordian').click()
        cy.url().should('include', '/accordian')

        cy.get('#section1Content').parent().should('have.class', 'show');

        cy.get('#section2Heading').click();
        cy.get('#section1Content').parent().should('not.have.class', 'show');
        cy.get('#section2Content').parent().should('have.class', 'show');
    })

    it('Date Picker', () => {
        cy.contains("Date Picker").click
        cy.url().should('include', '/date-picker')
        
        cy.get('#datePickerMonthYearInput').click()
        cy.get('[class*="month-select"]').select('March')
        cy.get('[class*="year-select"]').select('2026')
        cy.get('[class*="day--003"').click()

        cy.get('#datePickerMonthYearInput').should('contain.value', '03/03/2026');
    })

    it('Progress Bar', () => {
        cy.contains("Progress Bar").click()
        cy.url().should('include', '/progress-bar')
        
        // Start
        cy.contains('button', 'Start').click()
        cy.get('[role="progressbar"]').should('have.class', 'bg-info')
        cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow').and('not.eq', '0')

        // Waiting to complete
        cy.wait(20000)
        cy.get('[role="progressbar"]').should('have.class', 'bg-success')
        cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow').and('eq', '100')
        cy.contains('button', 'Reset').should('be.visible')

        // Resetting
        cy.contains('button', 'Reset').click()
         cy.get('[role="progressbar"]').should('have.attr', 'aria-valuenow').and('eq', '0')
    })
})