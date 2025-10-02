import { debug } from "console"

describe('Day 1 Test Cases', () => {
    // let url = "https://www.saucedemo.com/"
    let errorMsg = "Epic sadface: Username and password do not match any user in this service"

    it("Login Failure", ()=> {
        cy.visit('/')
        cy.getDataTest('username').type("standard_user")
        cy.getDataTest('password').type("xxxxxxx")
        cy.getDataTest('login-button').click()

        cy.getDataTest('error').should('contain.text', errorMsg)
    })

    it("Sort And Add to Cart", ()=> {
        // Login Success
        cy.visit('/')
        cy.getDataTest('username').type("standard_user")
        cy.getDataTest('password').type("secret_sauce")
        cy.getDataTest('login-button').click()
        
        cy.url().should('include', '/inventory.html')
        cy.getDataTest('title').should('contain.text', 'Products')

        // Sorting product by price.
        cy.getDataTest('product-sort-container').select('lohi')
        cy.getDataTest('inventory-item-price').then($els => {
            
            const texts = [...$els].map(el => parseFloat(el.innerText.trim().replace('$', '')))
            console.log('Fetched texts:', texts);

            // Create a copy and sort it
            const sorted = [...texts].sort((a, b) => a - b);

            // Assert that original order === sorted order
            expect(texts).to.deep.equal(sorted);
        });

        // Add item to the cart
        let item = 'Sauce Labs Onesie'
        cy.xpath(`//*[@data-test='inventory-item-name' and text()='${item}']/ancestor::*[@data-test='inventory-item']//button`).click()

        cy.getDataTest('shopping-cart-badge').should('have.text', '1')

        cy.getDataTest('shopping-cart-badge').click()
        cy.url().should('include', '/cart')

        cy.getDataTest('checkout').click()
         cy.url().should('include', '/checkout-step-one')
    })

})