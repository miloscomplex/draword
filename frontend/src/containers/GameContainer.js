import React, { Component } from 'react'
import GamePlay from './GamePlay'
import PhraseSelector from './PhraseSelector'

class GameContainer extends React.Component {

  state = {
    selectedPhrase: null
  }

  updatePhrase = (phrase) => {
    this.setState({ phrases: phrase })
  }

  render() {
    console.log(this.props)
    return (
      this.state.selectedPhrase == null ? <PhraseSelector selectedPhrase={this.updatePhrase}/> : <GamePlay />
    )
  }
}

export default GameContainer
