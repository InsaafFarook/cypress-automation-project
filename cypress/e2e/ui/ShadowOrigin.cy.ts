describe('Shadow Dom Tests', () => {

    it("Shadow Dom", () => {
        cy.visit('https://the-internet.herokuapp.com/shadowdom')

        cy.xpath('(//my-paragraph)[1]').shadow().find('[name="my-text"]').should('have.text', "My default text")
        cy.xpath('(//my-paragraph)[1]').find('[slot="my-text"]').should('have.text', "Let's have some different text!")

        cy.xpath('(//my-paragraph)[2]').shadow().find('[name="my-text"]').should('have.text', "My default text")
        cy.xpath('(//my-paragraph)[2]').xpath('//*[@slot="my-text"]/li[1]').should('have.text', "Let's have some different text!")
        cy.xpath('(//my-paragraph)[2]').xpath('//*[@slot="my-text"]/li[2]').should('have.text', "In a list!")
    })

    it("Cross Origin", ()=>{
        cy.visit('https://csreis.github.io/tests/cross-site-iframe.html?utm_source=chatgpt.com')

        cy.contains('Go cross-site (complex page)').click()

        // cy.get('#frame1')
        // .invoke('attr', 'src')
        // .then((src) => {
        //     if(!src) throw new Error("Frame Not Found")
        //     const providerUrl = new URL(src)
        //     const providerOrigin = `${providerUrl.protocol}//${providerUrl.host}`


        //     cy.origin(providerOrigin, {args : {href:providerUrl.href}}, ({href}) => {
        //         cy.visit(href)
        //         cy.get('.console-title h1').should('contain.text', 'Chromium Main Console')
        //     })
        // })
    
        cy.get('#frame1').invoke('attr', 'src').then((src) => {
            if(!src || typeof src!== 'string') throw new Error("Src not found")
            cy.visit(src)

            cy.origin(src, ()=> {
                cy.get('.console-title h1').should('contain.text', 'Chromium Main Console');
            })
        })
    })

    it("Dynamic Content", ()=> {
        cy.clock()
        cy.visit('https://demoqa.com/dynamic-properties')

        cy.get('#enableAfter').should('not.be.enabled')
        cy.get('#visibleAfter').should('not.exist')
        cy.get('#colorChange').invoke('css','color').then((color) => {
            console.log(color)
            expect(color).to.be.eq('rgb(255, 255, 255)')
        })
        
        cy.tick(4000)
        cy.get('#enableAfter').should('not.be.enabled')
        cy.get('#visibleAfter').should('not.exist')

        cy.tick(1000)
        cy.get('#enableAfter').should('be.enabled')
        cy.get('#visibleAfter').should('be.visible')
    })
})