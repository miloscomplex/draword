function busyReducer(state = false, action) {
  switch (action.type) {
    case 'FETCHING':
      return true
    case 'ADD_PHRASES':
      return false
    case 'LOAD_ROOMS':
      return false
    case 'ADD_ROOMS':
      return false
    case 'UPDATE_USER':
      return false
    default:
      return state
  }

}

export default busyReducer
