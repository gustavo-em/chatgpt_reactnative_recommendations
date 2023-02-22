const ptBr = {
  screens: {
    gptOnboarding: "Onboarding",
    gptListOnboarding: "Lista de consultórios",
  },

  onboarding: {
    saleCreate: "Criar Primeira Venda",
    productCreate: "Criar Primeiro Produto",
  },

  gptHome: {
    input: {
      city: "Qual sua cidade?",
      cityHelper: "A cidade que você gostaria de consultar",
      cityPlaceHolder: "São Paulo",
      doctor: "Qual especialidade médica?",
      doctorHelp: "Qual a especialidade do médico você gostaria de ter uma consulta",
      doctorPlaceholder: "Oftalmologista",
    },
    titlePage: "Tenha recomendação dos melhores médicos da sua cidade para marcar consulta!",
    buttonDiscover: "Descobrir",
  },
  errors: {
    required: "O Campo é requerido",
    tooShort: "Texto muito pequeno",
    tooLong: "Texto muito grande",
  },
}

export default ptBr
export type Translations = typeof ptBr
