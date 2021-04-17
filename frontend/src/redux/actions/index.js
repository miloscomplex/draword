import { API_ROOT, PARSE_JSON, HEADERS } from '../../constants'

export function loadPhrases() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/random-phrases`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_PHRASES', payload: data}))
  }
}

export function getPhrase(phraseId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/phrases/${phraseId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'SET_ROOM_PHRASE', payload: data }))
  }
}

export function loadRooms() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_ROOMS', payload: data}))
  }
}

export function getRoom(roomId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'GET_ROOM', payload: data}))
    .catch( err =>  console.log('err= ', err))
  }
}

export function editRoomPhrase(phraseObj) {
  console.log('phraseObj= ', phraseObj);
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${phraseObj.room_id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(phraseObj)
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_ROOM', payload: data}) )
  }
}
