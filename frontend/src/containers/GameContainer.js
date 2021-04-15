import React, { Component } from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { API_ROOT } from '../constants'
import { handleFetch } from '../services/API'
import { connect } from 'react-redux'
import { loadPhrases } from '../redux/actions'

class GameContainer extends React.Component {

  handleFetch = () => {
    fetch(`${API_ROOT}/rooms/${this.state.roomId}`)
      .then(res => res.json())
      .then(chats => this.setState({ chats }))
  }

  componentDidMount = () => {
    this.props.loadPhrases()
    console.log('this.props= ', this.props);
  }

  componentDidUpdate() {
    console.log('didUpdate')
    console.log('state.selectedPhrase= ', this.props.selectedPhrase);
  }

  render() {
    //console.log(this.props.selectedPhrase)
    // match is browser props
    console.log(this.props.match);
    const busy = 'busy'
    return (
      <div>
        { this.props.busySignal ? busy : null }
        { /* if backend room.selected_phrase_id is false render PhraseContainer */ }

        { this.props.selectedPhrase === '' ? <PhraseContainer phrases={this.props.phrases} addSelected={this.props.phraseSelected} /> : <GamePlay match={this.props.match} /> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPhrase: state.phraseSelect.selectedPhrase,
    phrases: state.phrases.phrasesList,
    busySignal: state.busySignal
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSelected: phrase => dispatch({ type: 'ADD_SELECTED', payload: phrase }),
    addPhrases: phrases => dispatch({ type: 'ADD_PHRASES', payload: phrases }),
    resetSelectedPhrase: phrase => dispatch({ type: 'RESET_PHRASE', payload: phrase}),
    phraseSelected: phrase => dispatch({ type: 'SELECTED_PHRASE', payload: phrase }),
    loadPhrases: () => { dispatch(loadPhrases()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
