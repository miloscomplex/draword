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
          <h1>Phrase Selector</h1>
          <PhraseComponent phrases={this.state.phrases} />
        </div>
      </div>
    )
  }
}

export default PhraseSelector
