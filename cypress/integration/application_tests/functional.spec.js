/// <reference types="cypress" /> 

import loc from '../../support/locators'

describe('Should a test at a funcional level', () => {

  before(() => {
    cy.visit('http://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.USER).type('anniasebold3.0@gmail.com')
    cy.get(loc.LOGIN.PASSWORD).type('secret123')
    cy.get(loc.LOGIN.BTN_LOGIN).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo, Annia Sebold')
    cy.get(loc.BTN_CLOSE_MESSAGE).click()
  });

  it('Should create an account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
    cy.get(loc.CONTAS.NOME).type('Conta de teste')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso!')
  });

  it('Should update an account', () => {
    cy.get(loc.MENU.SETTINGS).click()
    cy.get(loc.MENU.CONTAS).click()
    cy.xpath(loc.CONTAS.XP_BTN_ALTERAR).click()
    cy.get(loc.CONTAS.NOME)
      .clear()
      .type('Conta de teste alterada')
    cy.get(loc.CONTAS.BTN_SALVAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
  });

});