const locators = {
  LOGIN:  {
    USER: ('[data-test=email]'),
    PASSWORD: ('[data-test=passwd]'),
    BTN_LOGIN: ('.btn')
},

  MENU: {
    HOME: '[data-test=menu-home]',
    SETTINGS: '[data-test=menu-settings]',
    CONTAS: '[href="/contas"]',
    RESET: '[href="/reset"]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]',
  },

  CONTAS: {
    NOME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    FN_XP_BTN_ALTERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`,
  },

  MOVIMENTACAO: {
    DESCRICAO: '#descricao',
    VALOR: '[data-test=valor]',
    INTERESSADO: '#envolvido',
    CONTA: '[data-test=conta]',
    BTN_SALVAR: '.btn-primary',
    STATUS: '[data-test=status]',
  },

  SALDO: {
    FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`,
  },

  EXTRATO: {
    QTD_LINHAS: '.list-group > li',
    FN_XP_REMOVE_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class='far fa-trash-alt']`,
  },

  MESSAGE: ('.toast-message'),
  BTN_CLOSE_MESSAGE: ('.toast-close-button'),

}

export default locators;