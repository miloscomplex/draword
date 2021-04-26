
const defaultStore = {
  gameState: 'start'
}

function gamePlayReducer(state = defaultStore, action) {
  switch (action.type) {
    case 'UPDATE_GAME_STATE':
      return {...state, gameState: action.payload.action }
    default:
      return state
  }
}

export default gamePlayReducer
