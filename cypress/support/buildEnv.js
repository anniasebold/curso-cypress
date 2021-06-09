const buildEnv = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      "id":1000,
      "nome": "Fake User",
      "token": "stringrande",
    }
  }).as('signin')

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [
      {
        conta_id: 12345, 
        conta: "Carteira", 
        saldo: "100.00"
      },
      {
        conta_id: 12345, 
        conta: "Banco", 
        saldo: "100000.00"
      }
  ]
  }).as('saldo')

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
        "nome": "Conta Fake",
        "visivel": true,
        "usuario_id": 1
      }
    ]
  }).as('contas')
}

export default buildEnv