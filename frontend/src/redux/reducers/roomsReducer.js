
const defaultStore = {
  roomsList: [],
  selectedRoom: ''
}

function roomsReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'ADD_ROOMS':
      return {...state, roomsList: action.payload }
    case 'SET_ROOM':
      return {...state, selectedRoom: action.payload }
    case 'UPDATE_ROOM':
      return {...state, selectedRoom: action.payload }
    default:
      return state
  }
}

export default roomsReducer
