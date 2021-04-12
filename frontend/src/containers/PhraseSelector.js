import React, { Component } from 'react'
import PhraseComponent from '../components/phraseSelector/PhraseComponent'

class PhraseSelector extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        <div className='phrase-selector'>
          <h2>Phrase Selector</h2>
          <p className='description'>Select One of the phrases/words below to draw.</p>
          <PhraseComponent updatePhrase={(phrase) => this.props.update} />
        </div>
      </div>
    )
  }
}

export default PhraseSelector
