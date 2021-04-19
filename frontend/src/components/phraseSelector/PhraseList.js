import React from 'react'
import { connect } from 'react-redux'

class PhraseList extends React.Component {

  handleClick = (matchObjId, phraseObjId) => {
    console.log(matchObjId, phraseObjId)
    this.props.setRoomPhrase( {room_id: matchObjId, phrase_id: phraseObjId})
  }

  phraseList = (phrases, matchObj) => {
    return phrases.map( phraseObj => {
      return (
        <li key={phraseObj.id} onClick={ event => this.handleClick(matchObj.params.id, phraseObj.id) } > { phraseObj.phrase } </li>
      )
    })
  }

  render() {

    return (
      <div>
        <ul className='phrases' >
          { this.phraseList(this.props.phrases, this.props.match) }
        </ul>
      </div>
    )
  }

}

export default PhraseList

// helpers
