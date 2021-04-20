const defaultStore = {
  phrase: ''
}

function selectedPhraseReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'SET_ROOM_PHRASE':
      return { ...state, phrase: action.payload }
    case 'RESET_PHRASE':
      return {...state, state: '' }
    default:
      return state
  }

}

export default selectedPhraseReducer
