import React, { Component } from 'react'
import PhraseComponent from '../components/phraseSelector/PhraseComponent'
import { connect } from 'react-redux'

class PhraseSelector extends React.Component {

  componentWillUnmount = () => {
    // change this to a rails call to set to active?: true and allow drawer rights to the room. 
    const phrase = ''
    this.props.resetSelectedPhrase(phrase)
    console.log('PhraseSelector umounted!');
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='phrase-selector'>
          <h2>Phrase Selector</h2>
          <p className='description'>Select One of the phrases/words below to draw.</p>
          <PhraseComponent phrases={this.props.phrases} addSelected={this.props.addSelected} />
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetSelectedPhrase: phrase => dispatch({ type: 'RESET_PHRASE', payload: phrase})
  }
}

export default connect(null, mapDispatchToProps)(PhraseSelector)
