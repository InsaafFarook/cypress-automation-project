describe('Sample API Tests', () => {
  it('should send a GET request and verify the response', () => {
    cy.request('GET', 'https://dummy.restapiexample.com/api/v1/employees').then((response) => {
      // Assert the response status
      expect(response.status).to.eq(200);

      // Assert the response body contains expected data
      expect(response.body).to.have.property('status', "success");
      const data = response.body.data;
      expect(data).to.be.an('array');
      expect(data.length).to.be.greaterThan(0);
    });
  });

  // Testing of a POST endpoint.
  it('should send a POST request and verify the response', () => {
    const payload = {
      name: 'Ronaldo',
      salary: '$2000',
      age: "30"
    };

    cy.request('POST', 'https://dummy.restapiexample.com/api/v1/create', payload).then((response) => {
      // Assert the response status
      expect(response.status).to.eq(201);

      // Assert the response body contains the data related to recommendation input
      expect(response.body).to.have.property('status', "success");
      const data = response.body.data;
      expect(data).to.have.property('name', payload.name);
      expect(data).to.have.property('salary', payload.salary);
      expect(data).to.have.property('age', payload.age);
      expect(data).to.have.property('id').and.be.a('number');
    });
  });

  
});
