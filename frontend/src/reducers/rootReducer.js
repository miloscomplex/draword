import { combineReducers } from 'redux'
import canvasReducer from './canvasReducer'

const rootReducer = combineReducers({
  canvas: canvasReducer
})

export default rootReducer
