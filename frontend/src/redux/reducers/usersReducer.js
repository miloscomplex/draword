
const defaultStore = {
  user: []
}

function usersReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {...state, user: action.payload }
    case 'UPDATE_USER':
      return {...state, user: action.payload }
    case 'REMOVE_USER':
      return {...state, user: [] }
    default:
      return state
  }
}

export default usersReducer
