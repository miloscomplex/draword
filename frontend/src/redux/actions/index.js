import { API_ROOT, PARSE_JSON, HEADERS } from '../../constants'

export function loadPhrases() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/random-phrases`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_PHRASES', payload: data}))
  }
}

export function setRoomPhrase(phraseObj) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(phraseObj)
    }).then(PARSE_JSON)
    .then(data => console.log(data))
    // .then(data => dispatch({type: 'SET_ROOM_PHRASE', payload: data}))
  }
}
