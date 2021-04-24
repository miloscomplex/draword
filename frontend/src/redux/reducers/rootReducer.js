import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phrasesReducer from './phrasesReducer'
import roomsReducer from './roomsReducer'
import busyReducer from './busyReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phrases: phrasesReducer,
  busySignal: busyReducer,
  rooms: roomsReducer,
  users: usersReducer,
})

export default rootReducer
