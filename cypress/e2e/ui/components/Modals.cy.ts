describe('Modal Tests', () => {

    it('Modals', () => {
        cy.visit('https://demoqa.com/modal-dialogs', { timeout: 10000 })

        cy.get('#showSmallModal').click()
        cy.get('#example-modal-sizes-title-sm').should('be.visible').and('have.text', 'Small Modal')
        cy.get('button.close').should('be.visible')
        cy.get('.modal-body').should('have.text', 'This is a small modal. It has very less content')
        cy.get('#closeSmallModal').should('be.visible').click()
        cy.get('#example-modal-sizes-title-sm').should('not.exist')

        cy.get('#showLargeModal', { timeout: 10000 }).click()
        cy.get('#example-modal-sizes-title-lg').should('be.visible').and('have.text', 'Large Modal')
        cy.get('button.close').should('be.visible').click()
        cy.get('#example-modal-sizes-title-lg').should('not.exist')
    })
})