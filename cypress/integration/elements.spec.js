describe('Work with basic elements', () => {
  before(() => {
    cy.visit('https://wcaquino.me/cypress/componentes.html')
  });

  beforeEach(() => {
    cy.reload()
  });

  it('Text', () => {
    cy.get('body').should('contain', 'Cuidado')
    cy.get('span').should('contain', 'Cuidado')
    cy.get('.facilAchar').should('contain', 'Cuidado')
    cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  });

  it('Links', () => {
    cy.get('[href="#"]').click()
    cy.get('#resultado').should('have.text', 'Voltou!')

    cy.reload()
    cy.contains('Voltar').click()
    cy.get('#resultado').should('have.text', 'Voltou!')
  });

  it('TextFields', () => {
    cy.get('#formNome').type('Annia Sebold')
      .should('have.value', 'Annia Sebold')

    cy.get('#elementosForm\\:sugestoes')
      .type('Sugestão teste')
      .should('have.value', 'Sugestão teste')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('Teste12345{backspace}{backspace}')
      .should('have.value', 'Teste123')

    cy.get('#elementosForm\\:sugestoes')
      .clear()
      .type('Erro{selectAll}Acerto', { delay: 100 })
      .should('have.value', 'Acerto')

  });

  it('RadioButton', () => {
    cy.get('#formSexoFem').click()
      .should('be.checked')

    cy.get('#formSexoMasc').should('not.be.checked')

    cy.get("[name='formSexo']").should('have.length', 2)
  });

  it('Checkbox', () => {
    cy.get("[name=formComidaFavorita]").click({ multiple: true })
      .should('be.checked')
  });

  it('ComboBox', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('2o grau completo')
      .should('have.value', '2graucomp')

    cy.get('[data-test=dataEscolaridade] option')
      .should('have.length', 8)

    cy.get('[data-test=dataEscolaridade] option').then($arr => {
      const values = []
      $arr.each(function () {
        values.push(this.innerHTML)
      })
      expect(values).to.include.members(["Superior", "Mestrado"])
    })
  });

  it.only('Combo Múltiplo', () => {
    cy.get('[data-testid=dataEsportes]')
      .select(['natacao', 'Corrida', 'nada'])

    cy.get('[data-testid=dataEsportes]').then($el => {
      expect($el.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
      expect($el.val()).to.have.length(3)
    })

    cy.get('[data-testid=dataEsportes]')
      .invoke('val')
      .should('eql', ['natacao', 'Corrida', 'nada'])
  });

});