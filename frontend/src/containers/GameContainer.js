import React, { Component } from 'react'
import GamePlay from './GamePlay'
import PhraseSelector from './PhraseSelector'

class GameContainer extends React.Component {

  state = {
    selectedPhrase: null
  }

  updatePhrase = (phrase) => {
    console.log('i was called');
    this.setState({ selectedPhrase: phrase })
  }

  render() {
    console.log(this.props)
    return (
      this.state.selectedPhrase == null ? <PhraseSelector update={(phrase) => this.updatePhrase(phrase)} /> : <GamePlay />
    )
  }
}

export default GameContainer
