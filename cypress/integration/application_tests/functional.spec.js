/// <reference types="cypress" /> 

import loc from '../../support/locators'
import '../../support/commandsContas'

describe('Should a test at a functional level', () => {

  before(() => {
    cy.login('anniasebold3.0@gmail.com', 'secret123', 'Annia Sebold')
    cy.resetApp()
  });
  
  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
  });

  it('Should create an account', () => {
    cy.acessarMenuConta()
    cy.inserirConta('Conta de teste')
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
  });

  it('Should update an account', () => {
    cy.acessarMenuConta()

    cy.xpath(loc.CONTAS.FN_XP_BTN_ALTERAR('Conta para alterar')).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta de teste alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  });

  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()

    cy.get(loc.CONTAS.NOME).type('Conta mesmo nome')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'code 400')
  });

  it('Should create a transaction', () => {
    cy.get(loc.MENU.MOVIMENTACAO).click()
    
    cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Salario')
    cy.get(loc.MOVIMENTACAO.VALOR).type('1200')
    cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Annia')
    cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
    cy.get(loc.MOVIMENTACAO.STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso!')
    cy.get('.list-group > li').should('have.length', 7)
  });

  it('Should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo'))
      .should('contain', '534,00')
  });

  it('Should remove a transaction', () => {
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_REMOVE_ELEMENTO('Movimentacao para exclusao')).click()
    cy.get(loc.MESSAGE).should('contain', 'removida com sucesso!') 
  });

});