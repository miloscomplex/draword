function busyReducer(state = false, action) {
  switch (action.type) {
    case 'FETCHING':
      return true
    case 'ADD_PHRASES':
      return false
    default:
      return state
  }

}

export default busyReducer
