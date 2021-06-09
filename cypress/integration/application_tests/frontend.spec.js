/// <reference types="cypress" /> 

import loc from '../../support/locators'
import '../../support/commandsContas'
import buildEnv from '../../support/buildEnv'

describe('Should a test at a frontend level', () => {

  after(() => {
    cy.clearLocalStorage()
  });

  before(() => {
    buildEnv()
  });
  
  beforeEach(() => {
    buildEnv()
    cy.login('anniasebold3.0@gmail.com', 'secret', 'Fake User')
    cy.get(loc.MENU.HOME).click()
  });

  it('Should create an account', () => {

    cy.route({
      method: 'POST',
      url: '/contas',
      response: {
        "id":3,
        "nome": "Conta Fake",
        "visivel": true,
        "usuario_id": 1
      },
      onRequest: req => {
        expect(req.request.body.nome).to.be.not.empty
        expect(req.request.headers).to.have.property('Authorization')
      }
    }).as('saveConta')

    cy.acessarMenuConta()
    cy.inserirConta('Conta Fake')
    // cy.wait('@saveConta').its('request.body.nome').should('not.be.empty')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
  });

  it('Should update an account', () => {
    cy.route({
      method: 'PUT',
      url: '/contas/3',
      response: {
        "id":3,
        "nome": "Conta Fake alterada",
        "visivel": true,
        "usuario_id": 1
      }
    })

    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        {
          id: 1, 
          nome: "Carteira", 
          visivel: true,
          usuario_id: 1,
        },
        {
          id: 2, 
          nome: "Banco", 
          visivel: true,
          usuario_id: 1,
        },
        {
          "id":3,
          "nome": "Conta Fake alterada",
          "visivel": true,
          "usuario_id": 1
        }
      ]
    }).as('contas')

    cy.acessarMenuConta()

    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta Fake')).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta Fake alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  });

  it('Should not create an account with same name', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { error: "Já existe uma conta com esse nome!" },
      status: 400
    })
    
    cy.acessarMenuConta()

    cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  });

  it('Should create a transaction', () => {
    
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: {
        id: 585268, 
        descricao: "Movimentação fake",
        envolvido: "Envolvido fake",
        observacao: null,
        tipo: "REC"
      }
    })
    
    cy.get(loc.MENU.MOVIMENTACAO).click()
    
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Salario')
    cy.get(loc.MOVIMENTACAO.VALOR).type('1200')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Annia')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Banco')
    cy.get(loc.MOVIMENTACAO.STATUS).click()

    cy.route({
      method: 'GET',
      url: '/extrato/202106?orderBy=data_pagamento',
      response: 'fixture:movimentacaoSalva'
    }).as('extrato')

    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso!')
    cy.get('.list-group > li').should('have.length', 7)
  });

  it('Should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Carteira'))
      .should('contain', '100,00')
  });

  it('Should remove a transaction', () => {
    cy.route({
      method: 'GET',
      url: '/extrato/202106?orderBy=data_pagamento',
      response: 'fixture:movimentacaoSalva'
    }).as('extrato') 
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204
    }).as('del')

    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVE_ELEMENTO('Movimentacao de conta')).click()
    cy.get(loc.MESSAGE).should('contain', 'removida com sucesso!') 
  });

});