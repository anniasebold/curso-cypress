/// <reference types="cypress" />

describe('Work with iFrames', () => {
  beforeEach(() => {
    cy.reload()
  });

  it('Deve preencher campo de texto', () => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
    cy.get('#frame1').then(iframe => {
      const body = iframe.contents().find('body')
      cy.wrap(body).find('#tField')
        .type('funciona')
        .should('have.value', 'funciona')

      cy.on('window:alert', msg => {
        expect(msg).to.be.equal('Alert Simples')
      })

      // cy.wrap(body).find('#otherButton').click()
    })
  });

  it.only('Deve testar o popup diretamente', () => {
    cy.visit('https://wcaquino.me/cypress/frame.html')
    cy.get('#otherButton').click()

    cy.on('window:alert', msg => {
      expect(msg).to.be.equal('Click OK!')
    })

  });


});