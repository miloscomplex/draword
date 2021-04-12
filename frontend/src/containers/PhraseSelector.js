import React, { Component } from 'react'
import PhraseComponent from '../components/phraseSelector/PhraseSelector'

class PhraseSelector extends React.Component {

  state = {
    phrases: [ 'Ball of Confusion', 'House of the Rising Sun', 'These Boots are Made for Walking', 'In Da Club' ]
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='phrase-selector'>
          <h2>Phrase Selector</h2>
          <p className='description'>Select One of the phrases/words below to draw.</p>
          <PhraseComponent phrases={this.state.phrases} />
        </div>
      </div>
    )
  }
}

export default PhraseSelector
