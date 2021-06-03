/// <reference types="cypress" /> 

describe('Should a test at a funcional level', () => {

  let token
  
  before(() => {
    cy.getToken('anniasebold3.0@gmail.com', 'secret123')
      .then(tkn => {
        token = tkn
      })
  });
  
  beforeEach(() => {
    cy.resetRest()
  });

  it('Should create an account', () => {
      cy.request({
        method: 'POST',
        url: '/contas',
        headers: {Authorization: `JWT ${token}`},
        body: {
          nome: "Conta via rest"
        }
      }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.have.property('id')
      expect(res.body).to.have.property('nome', 'Conta via rest')
    })
  });

  it('Should update an account', () => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: {Authorization: `JWT ${token}`},
      qs: {
        nome: 'Conta para alterar'
      }
    }).then(res => {
      cy.request({
        method: 'PUT',
        url: `contas/${res.body[0].id}`,
        headers: {Authorization: `JWT ${token}`},
        body: {
          nome: "Conta alterada via rest"
        }
      }).as('response')
    })

    cy.get('@response').its('status').should('be.equal', 200)

  });

  it.only('Should not create an account with same name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      headers: {Authorization: `JWT ${token}`},
      body: {
        nome: "Conta mesmo nome"
      },
      failOnStatusCode: false
    }).as('response')

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
  });

  it('Should create a transaction', () => {

  });

  it('Should get balance', () => {

  });

  it('Should remove a transaction', () => {

  });

});