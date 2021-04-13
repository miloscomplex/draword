import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'
import phraseSelectReducer from './phraseSelectReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer,
  phraseSelect: phraseSelectReducer
})

export default rootReducer
