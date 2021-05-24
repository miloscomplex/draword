import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phrasesReducer from './phrasesReducer'
import roomsReducer from './roomsReducer'
import busyReducer from './busyReducer'
import usersReducer from './usersReducer'
import timerReducer from './timerReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phrases: phrasesReducer,
  busySignal: busyReducer,
  rooms: roomsReducer,
  users: usersReducer,
  timer: timerReducer,
})

export default rootReducer
