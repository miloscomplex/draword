import React from 'react'
import { connect } from 'react-redux'

class PhraseList extends React.Component {

  phraseList = (phrases, match) => {
    return phrases.map( phraseObj => {
      return (
        <li key={phraseObj.id} onClick={ event => this.props.handleClick(match, phraseObj.id)} > {phraseObj.phrase} </li>
      )
    })
  }

  render() {
    console.log('this.props.match= ', this.props.match);

    return (
      <div>
        <ul className='phrases' >
          { this.phraseList(this.props.phrases, this.props.match.params.id) }
        </ul>
      </div>
    )
  }

}

export default PhraseList

// helpers
