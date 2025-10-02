const users = require('../../../fixtures/users.json');

describe('Sample testing', () => {

    users.forEach((u: any) => {
        it(`Login as ${u.name}`, () => {
             cy.log(`${u.name}-${u.email}-${u.password}`)
        })
    })

})

describe('Sample Test 2', () => {

    it('Test 2', ()=> {

        cy.fixture('users.json').then((user) => {
            const u = user[0]
            cy.log(`${u.name}-${u.email}-${u.password}`)
        })
    })
})
