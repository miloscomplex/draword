import { API_ROOT, PARSE_JSON, HEADERS } from '../../constants'

export function loadPhrases() {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/random-phrases`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_PHRASES', payload: data}))
  }
}

export function loadChats(roomId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    //.then(data => console.log('loadChats= ', data.chats ))
    .then(data => dispatch({type: 'LOAD_CHATS', payload: data}))
  }
}

export function addChat(chatObj) {
  return (dispatch) => {
    dispatch({ type: 'ADD_CHAT', payload: chatObj })
  }
}


export function setPhrase(phraseObj) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/phrases/${phraseObj.phrase_id}`)
    .then(PARSE_JSON)
    //.then(data => console.log('setPhrase= ', data))
    .then(data => dispatch({ type: 'SET_ROOM_PHRASE', payload: data }))
    .catch( err =>  console.log('err= ', err))
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
    fetch(`${API_ROOT}/rooms`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_ROOMS', payload: data}))
  }
}

export function getRoom(roomId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`)
    .then(PARSE_JSON)
    .then(data => dispatch({ type: 'SET_ROOM', payload: data}) )
    .catch( err =>  console.log('err= ', err))
  }
}

export function setRoom(roomId) {
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomId}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(roomId)
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_ROOM', payload: data }))
  }
}

export function editRoom(roomObj) {
  //console.log('editRoom roomObj= ', roomObj);
  return (dispatch) => {
    dispatch({ type: 'FETCHING' })
    fetch(`${API_ROOT}/rooms/${roomObj.room_id}`, {
      method: 'PUT',
      headers: HEADERS,
      body: JSON.stringify(roomObj),
    }).then(PARSE_JSON)
    .then(data => dispatch({ type: 'UPDATE_ROOM', payload: data }))
  }
}
