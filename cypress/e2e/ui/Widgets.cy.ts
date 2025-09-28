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

    it('Tabs', () => {
        cy.contains("Tabs").click()
        cy.url().should('include', '/tabs')
        
        cy.get('#demo-tab-what').should('have.attr', 'aria-selected').and('eq', 'true')
        cy.get('#demo-tab-origin').click()
        cy.get('#demo-tab-what').should('have.attr', 'aria-selected').and('eq', 'false')
        cy.get('#demo-tab-origin').should('have.attr', 'aria-selected').and('eq', 'true')
    })

    it('Tool Tips & Menu', () => {
        cy.contains("Tool Tips").click()
        cy.url().should('include', '/tool-tips')
        
        cy.get('#toolTipButton').trigger('mouseover')
        cy.get('#buttonToolTip .tooltip-inner').should('have.text', 'You hovered over the Button')

        cy.get('#toolTipTextField').trigger('mouseover')
        cy.get('#textFieldToolTip .tooltip-inner').should('have.text', 'You hovered over the text field')

        cy.contains("Menu").click()
        cy.url().should('include', '/menu')
        cy.contains('a', 'Main Item 2').parent().realHover()
        cy.contains('a', 'SUB SUB LIST »').parent().realHover()
    })

    it('Selects Menu', () => {
        cy.contains("Select Menu").click()
        cy.url().should('include', '/select-menu')

        cy.get('#withOptGroup').click()
        cy.contains('div', 'Group 1').xpath('//div[text()="Group 1, option 2"]').click()
        cy.get('#withOptGroup [class*="-singleValue"]').should('have.text', 'Group 1, option 2')

        cy.get('#selectOne').click()
        cy.contains('div', 'Pick one title').xpath('//div[text()="Mr."]').click()
        cy.get('#selectOne [class*="-singleValue"]').should('have.text', 'Mr.')

        cy.get('#oldSelectMenu').select('Yellow')
        cy.get('#oldSelectMenu').should('have.value', '3')

        cy.contains('Select...').click()
        cy.xpath('//div[contains(@id,"react-select") and text()="Green"]').click()
        cy.xpath('//div[contains(@id,"react-select") and text()="Blue"]').click()

        cy.get('[class*="multiValue"] .css-12jo7m5').then($els => {
            const texts = [...$els].map(el => el.innerText.trim())
            expect(texts).to.deep.equal(['Green', 'Blue']);
        })

        cy.get('#cars').select(['Saab', 'Audi']);
        cy.get('#cars').invoke('val').should('have.members', ['saab', 'audi']);
    })
})