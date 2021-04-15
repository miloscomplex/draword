import React, { Component } from 'react'
import PhraseList from './PhraseList'
import { connect } from 'react-redux'
import { setRoomPhrase, loadPhrases } from '../../redux/actions'

class PhraseContainer extends React.Component {

  componentWillUnmount = () => {
    // change this to a rails call to set to active?: true and allow drawee rights to the room.
    //const phrase = ''
    //this.props.resetSelectedPhrase(phrase)
    console.log('PhraseSelector umounted!');
  }

  componentDidMount = () => {
    this.props.loadPhrases()
    //console.log('state= ', this.props.phrases);
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='phrase-selector'>
          <h2>Phrase Selector</h2>
          <p className='description'>Select One of the phrases/words below to draw.</p>
          <PhraseList phrases={this.props.phrases} setRoomPhrase={this.props.setRoomPhrase} match={this.props.match} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
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
    loadPhrases: () => { dispatch(loadPhrases()) },
    setRoomPhrase: phraseObj => { dispatch(setRoomPhrase(phraseObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhraseContainer)
