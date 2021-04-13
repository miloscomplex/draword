import { API_ROOT, PARSE_JSON } from '../../constants'

export function loadPhrases() {
  return (dispatch) => {
    fetch(`${API_ROOT}/random-phrases`).then(PARSE_JSON)
    .then(data => dispatch({type: 'ADD_PHRASES', payload: data}))
  }
}
