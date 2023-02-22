const en = {
  screens: {
    gptOnboarding: "Onboarding",
    gptListOnboarding: "List of offices",
  },

  onboarding: {
    saleCreate: "Criar Primeira Venda",
    productCreate: "Criar Primeiro Produto",
  },

  gptHome: {
    input: {
      city: "What is your city?",
      cityHelper: "The city you would like to consult",
      cityPlaceHolder: "São Paulo",
      doctor: "Which medical specialty?",
      doctorHelp: "Which doctor's specialty would you like to have a consultation with?",
      doctorPlaceholder: "Ophthalmologist",
    },
    titlePage: "Have a recommendation from the best doctors in your city to make an appointment!",
    buttonDiscover: "Discover",
  },

  errors: {
    required: "Field required",
    tooShort: "Too short",
    tooLong: "Too long",
  },
}

export default en
export type Translations = typeof en
