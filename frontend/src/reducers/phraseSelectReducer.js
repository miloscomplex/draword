function phraseSelectReducer(state = { selectedPhrase: null, }, action) {
  switch (action.type) {
    case 'ADD_PHRASE':
      const newPhrase = {
        selectedPhrase: action.payload.phrase
      }
      return { selectedPhrase: action.phrase }
    default:
      return state
  }

}
