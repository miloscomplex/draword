
const defaultStore = {
  selectedPhrase: ''
}

function phraseSelectReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'ADD_SELECTED':
      return {...state, selectedPhrase: action.payload }
    case 'RESET_PHRASE':
      return {...state, selectedPhrase: action.payload }
    default:
      return state
  }

}

export default phraseSelectReducer
