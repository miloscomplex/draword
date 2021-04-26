import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phrasesReducer from './phrasesReducer'
import roomsReducer from './roomsReducer'
import busyReducer from './busyReducer'
import usersReducer from './usersReducer'
import gamePlayReducer from './gamePlayReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phrases: phrasesReducer,
  busySignal: busyReducer,
  rooms: roomsReducer,
  users: usersReducer,
  gamePlay: gamePlayReducer,
})

export default rootReducer
