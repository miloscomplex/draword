
const defaultStore = {
  rooms: ''
}

function roomsReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'ADD_ROOM':
      return {...state, rooms: action.payload }
    case 'LOAD_ROOM':
      return action.payload
    default:
      return state
  }

}

export default roomsReducer
