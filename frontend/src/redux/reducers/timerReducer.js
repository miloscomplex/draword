
const defaultStore = {
  loading: false,
}

function timerReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'FETCHING_TIMER':
      return {...state, loading: true }
    case 'UPDATE_TIMER':
      return {...state, timer: action.payload, loading: false }
    default:
      return state
  }
}

export default timerReducer
