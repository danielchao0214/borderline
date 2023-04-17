describe('Create Account Tests Edge Cases', () => {
  beforeEach(function(){
    cy.visit('http://localhost:3000/createaccount')
  })


  it('All Required fields test', () => {
    cy.intercept('POST', '/api/auth').as('create-account')
    
    cy.get('[style="display:flex;justify-content:center"] > .MuiButtonBase-root').click()

    cy.wait('@create-account').its('response.statusCode').should('eq',400);

    cy.get('@create-account').then(res =>{
      cy.log(res)
      expect(res.response.body.errorMessage).to.eql('ERROR: Please enter all required fields.')
    })
    
  })

  it('password length is greater then 8', () => {
    cy.intercept('POST', '/api/auth').as('create-account')


    cy.get('input[id=firstName]').type("Test")
    cy.get('#lastName').type('Test')
    cy.get('#email').type('Test@gmail.com')
    cy.get('#username').type('Test123')
    cy.get('#password').type('123')
    cy.get('#confirmPassword').type('123')
    
    cy.get('[style="display:flex;justify-content:center"] > .MuiButtonBase-root').click()

    cy.wait('@create-account').its('response.statusCode').should('eq',400);

    cy.get('@create-account').then(res =>{
      cy.log(res)
      expect(res.response.body.errorMessage).to.eql('ERROR: Password NOT long enough!!! at least 8 characters.')
    })
    
  })

  it('password match', () => {
    cy.intercept('POST', '/api/auth').as('create-account')


    cy.get('input[id=firstName]').type("Test")
    cy.get('#lastName').type('Test')
    cy.get('#email').type('Test@gmail.com')
    cy.get('#username').type('Test123')
    cy.get('#password').type('12345678')
    cy.get('#confirmPassword').type('12345679')
    
    cy.get('[style="display:flex;justify-content:center"] > .MuiButtonBase-root').click()

    cy.wait('@create-account').its('response.statusCode').should('eq',400);

    cy.get('@create-account').then(res =>{
      cy.log(res)
      expect(res.response.body.errorMessage).to.eql('ERROR: Password does not match Confimation Password ')
    })
    
  })






})