import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phraseSelectReducer from './phraseSelectReducer'
import phrasesReducer from './phrasesReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phraseSelect: phraseSelectReducer,
  phrases: phrasesReducer
})

export default rootReducer
