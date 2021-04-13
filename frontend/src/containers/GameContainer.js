import React, { Component } from 'react'
import GamePlay from './GamePlay'
import PhraseSelector from './PhraseSelector'
import { API_ROOT } from '../constants'
import { handleFetch } from '../services/API'
import { connect } from 'react-redux'
import { loadPhrases } from '../redux/actions'

class GameContainer extends React.Component {

  state = {
    selectedPhrase: ''
  }

  phraseSelected = (phrase) => {
    this.setState({
      selectedPhrase: phrase
    })
    this.props.addSelected(phrase)
  }

  componentDidMount = () => {
    this.props.loadPhrases()
  }

  componentDidUpdate() {
    console.log('didUpdate')
    console.log('state.selectedPhrase= ', this.props.selectedPhrase);
  }

  render() {
    //console.log(this.props.selectedPhrase)
    // match is browser props 
    return (
      this.props.selectedPhrase === '' ? <PhraseSelector phrases={this.props.phrases} addSelected={this.phraseSelected} /> : <GamePlay match={this.props.match} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSelected: phrase => dispatch({ type: 'ADD_SELECTED', payload: phrase }),
    addPhrases: phrases => dispatch({ type: 'ADD_PHRASES', payload: phrases }),
    resetSelectedPhrase: phrase => dispatch({ type: 'RESET_PHRASE', payload: phrase}),
    loadPhrases: () => { dispatch(loadPhrases()) }
  }
}

const mapStateToProps = state => {
  return {

    selectedPhrase: state.phraseSelect.selectedPhrase,
    phrases: state.phrases.phrasesList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
