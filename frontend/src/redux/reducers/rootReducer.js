import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phraseSelectReducer from './phraseSelectReducer'
import phrasesReducer from './phrasesReducer'
import busyReducer from './busyReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phraseSelect: phraseSelectReducer,
  phrases: phrasesReducer,
  busySignal: busyReducer
})

export default rootReducer
