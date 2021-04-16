import React, { Component } from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { API_ROOT } from '../constants'
import { handleFetch } from '../services/API'
import { connect } from 'react-redux'

class GameContainer extends React.Component {

  componentDidMount = () => {
    //console.log('this.props= ', this.props);
  }

  componentDidUpdate() {
    console.log('didUpdate')
  }

  render() {
    // match is browser props
    //console.log('this.props.match= ', this.props.match);
    const busy = 'busy'
    const notBusy = 'not busy'
    return (
      <div>
        { this.props.busySignal ? busy : notBusy }
        { /* if backend room.selected_phrase_id is false render PhraseContainer  else load the game as a guesser */ }

        <PhraseContainer match={this.props.match} />
        <GamePlay match={this.props.match} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    busySignal: state.busySignal,
    room: state.phrases.phrasesList,
  }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
