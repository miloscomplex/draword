const defaultStore = {
  phrasesList: [],
}

function phrasesReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'SET_ROOM_PHRASE':
      return {...state, selectedPhrase: action.payload }
    case 'SELECTED_PHRASE':
      return state
    case 'RESET_PHRASE':
      return {...state, selectedPhrase: '' }
    case 'ADD_PHRASES':
      return {...state, phrasesList: action.payload }
    case 'LOAD_PHRASES':
      return action.payload
    case 'GET_PHRASE':
      return action.payload

    default:
      return state
  }

}

export default phrasesReducer
