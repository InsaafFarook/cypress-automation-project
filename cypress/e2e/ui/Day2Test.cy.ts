describe('Day 2 Tests', ()=> {
    let url = 'https://the-internet.herokuapp.com'

    beforeEach('Load URL', ()=>{
        cy.visit(url)
    })

    it('JS Alerts', ()=>{
        cy.contains('JavaScript Alerts').click()
        cy.url().should('include', 'javascript_alerts')

        // Normal Alert
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('I am a JS Alert');
        });
        cy.contains('Click for JS Alert').click()

        // Confirm Alert
        cy.on('window:confirm', (msg) => {
            expect(msg).to.equal('I am a JS Confirm');
        });
        cy.on('window:confirm', () => true);
        cy.contains('Click for JS Confirm').click() 
        cy.get('#result').should('contain.text', 'Ok')

        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('Cypress Input');
        });
        cy.contains('Click for JS Prompt').click()
        cy.get('#result').should('contain', 'Cypress Input');      
    })

    it('File Upload', ()=>{
        cy.contains('a', 'File Upload').click()
        cy.url().should('include', 'upload')

        cy.get('#file-upload').selectFile('cypress/fixtures/file_upload.txt')
        cy.get('#file-submit').click()
        cy.contains('File Uploaded!').should('be.visible')
        cy.get('#uploaded-files').should('contain.text', 'file_upload.txt')
    })

    it('Infinite Scroll', () => {
        cy.contains('a', 'Infinite Scroll').click()

        for (let i = 0; i < 5; i++) {
            cy.get('.jscroll-added').then($els => {
                let prevLength = $els.length
                cy.wrap($els.last()).scrollIntoView()
                cy.wait(1000);

                cy.get('.jscroll-added').then($els2 => {
                    const newLength = $els2.length
                    expect(newLength).to.be.greaterThan(prevLength)
                    prevLength = newLength
                })
            })
        }
    })

    it("window test", () => {
        cy.visit('https://the-internet.herokuapp.com/windows')
        cy.contains('a', 'Click Here').invoke('removeAttr', 'target').click()

        cy.url().should('include', 'windows/new')
        cy.contains('New Window').should('be.visible')
    })

    // it('images are loaded (not broken)', () => {
    //     cy.contains('Broken Images').click()
    //     cy.url().should('include', '/broken_images')

    //     cy.get('.example img').each($img => {
    //         // Use DOM properties from the HTMLImageElement
    //         const el = $img[0] as HTMLImageElement;
    //         expect(el.complete, 'image finished loading').to.be.true;
    //         expect(el.naturalWidth, 'image has natural width').to.be.greaterThan(0);
    //         expect(el.naturalHeight, 'image has natural height').to.be.greaterThan(0);
    //     });
    // });

})