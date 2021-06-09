/// <reference types="cypress" /> 

describe('Should a test at a backend level', () => {
  
  before(() => {
    cy.getToken('anniasebold3.0@gmail.com', 'secret123')
  });
  
  beforeEach(() => {
    cy.resetRest()
  });

  it('Should create an account', () => {
      cy.request({
        method: 'POST',
        url: '/contas',
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
    cy.getContaByName('Conta para alterar')
      .then(contaId => {
        cy.request({
          method: 'PUT',
          url: `contas/${contaId}`,
          body: {
            nome: "Conta alterada via rest"
          }
        }).as('response')
    })

    cy.get('@response').its('status').should('be.equal', 200)

  });

  it('Should not create an account with same name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
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
    cy.getContaByName('Conta para movimentacoes')
      .then(contaId => {
        cy.request({
          method: 'POST',
          url: '/transacoes',
          body: {
            conta_id: contaId,
            data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
            data_transacao: Cypress.moment().format('DD/MM/YYYY'),
            descricao: "Conta para teste",
            envolvido: "Annia Sebold",
            status: false,
            tipo: "REC",
            valor: "1200"
          }
        }).as('response')
      })
    cy.get('@response').its('status').should('be.equal', 201)
  });

  it('Should get balance', () => {
    cy.request({
      method: 'GET',
      url: '/saldo',
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if(c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('534.00')
    })

    cy.request({
      method: 'GET',
      url: '/transacoes',
      qs: { descricao: 'Movimentacao 1, calculo saldo' }
    }).then(res => {
      cy.request({
        method: 'PUT',
        url: `/transacoes/${res.body[0].id}`,
        body: {
          status: true,
          data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
          data_pagamento: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
          descricao: res.body[0].descricao,
          envolvido: res.body[0].envolvido,
          valor: res.body[0].valor,
          conta_id: res.body[0].conta_id

        }
      }).its('status').should('be.equal', 200)
    })

    cy.request({
      method: 'GET',
      url: '/saldo',
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if(c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')
    })

  });

  it('Should remove a transaction', () => {
    cy.request({
      method: 'GET',
      url: '/transacoes',
      qs: { descricao: 'Movimentacao para exclusao' }
    }).then(res => {
      cy.request({
        method: 'DELETE',
        url: `/transacoes/${res.body[0].id}`,
      }).its('status').should('be.equal', 204)
    })
  });

});