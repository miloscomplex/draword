import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phraseSelectReducer from './phraseSelectReducer'
import phrasesReducer from './phrasesReducer'
import roomsReducer from './roomsReducer'
import busyReducer from './busyReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phraseSelect: phraseSelectReducer,
  phrases: phrasesReducer,
  busySignal: busyReducer,
  rooms: roomsReducer
})

export default rootReducer
