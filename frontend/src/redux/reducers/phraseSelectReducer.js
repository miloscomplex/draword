
const defaultStore = {
  selectedPhrase: ''
}

function phraseSelectReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'SET_ROOM_PHRASE':
      return {...state, selectedPhrase: action.payload }
    case 'SELECTED_PHRASE':
      return state
    case 'RESET_PHRASE':
      return {...state, selectedPhrase: '' }
    default:
      return state
  }

}

export default phraseSelectReducer
