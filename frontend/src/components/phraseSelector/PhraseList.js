import React from 'react'
import { connect } from 'react-redux'

class PhraseList extends React.Component {

  handleClick = (matchObj, phraseObj) => {
    this.props.setRoomPhrase( {room_id: matchObj.params.id, phrase_id: phraseObj.id})
  }

  phraseList = (phrases, matchObj) => {
    return phrases.map( phraseObj => {
      return (
        <li key={phraseObj.id} onClick={ event => this.handleClick(matchObj, phraseObj) } > { phraseObj.phrase } </li>
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
