/// <reference types="cypress" /> 

describe('Fixture tests', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  });

  beforeEach(() => {
    cy.reload()
  });

  it('Get data from fixture file', function() {
    cy.fixture('userData').as('usuario').then((() => {
      cy.get('#formNome').type(this.usuario.nome)
      cy.get('#formSobrenome').type(this.usuario.sobrenome)
      cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
      cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click()
      cy.get('#formEscolaridade').select(this.usuario.escolaridade)  
      cy.get('#formEsportes').select(this.usuario.esportes)
    }))
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
  })

  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
  foods.forEach(food => {
    it(`Testes Dinâmicos com ${food}`, () => {
      cy.get('#formNome').type('Annia')
      cy.get('#formSobrenome').type('Sebold')
      cy.xpath(`//label[contains(., '${food}')]/preceding-sibling::input`).click()
    });
  })

  it.only('Deve preencher todos', () => {
    cy.get('#formNome').type('Annia')
      cy.get('#formSobrenome').type('Sebold')
      cy.get(`[name=formComidaFavorita]`).each($el => {
        if($el.val()  != 'vegetariano')
          cy.wrap($el).click()
      })
  });

})