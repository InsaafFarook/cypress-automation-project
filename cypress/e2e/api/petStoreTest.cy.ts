describe('Petstore API — addPet & getPetById (simple)', () => {
  let petId: number
  let base = Cypress.env('apiUrl') as string
  const uniqueId = Date.now() // unique per run to avoid collisions

  after(() => {
    if (petId) {
      cy.request({
        method: 'DELETE',
        url: `${base}/pet/${petId}`,
        failOnStatusCode: false, // 404 acceptable if already cleaned up
      }).its('status').should('be.oneOf', [200, 404])
    }
  })

  it('POST /pet creates a pet using fixture payload', () => {
    cy.fixture('new_pet.json').then((pet) => {
      const payload = { ...pet, id: uniqueId }

      cy.request({
        method: 'POST',
        url: `${base}/pet`,
        body: payload,
        headers: { 'Content-Type': 'application/json' },
      }).then((res) => {
        expect(res.status, 'status').to.eq(200) // Petstore returns 200 with entity
        expect(res.body).to.include({ name: payload.name, status: payload.status })
        expect(res.body.photoUrls).to.be.an('array').and.not.empty
        expect(res.body.id).to.be.a('number')

        petId = res.body.id
      })
    })
  })

  it('GET /pet/{id} returns the created pet', () => {
    expect(petId, 'petId from create').to.be.a('number')

    cy.request({
      method: 'GET',
      url: `${base}/pet/${petId}`,
    }).then((res) => {
      expect(res.status).to.eq(200)
      expect(res.body.id).to.eq(petId)
      expect(res.body.name).to.be.a('string').and.not.empty
      expect(res.body.photoUrls).to.be.an('array').and.not.empty
    })
  })

  it('GET /pet/{id} returns 404 for non-existing pet (negative case)', () => {
    const missingId = uniqueId + 999999
    cy.request({
      method: 'GET',
      url: `${base}/pet/${missingId}`,
      failOnStatusCode: false,
    }).then((res) => {
      expect(res.status).to.eq(404)
      expect(res.body).to.have.property('message')
    })
  })
})
