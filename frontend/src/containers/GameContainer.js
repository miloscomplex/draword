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
    return (
      <div>
        { this.props.busySignal ? busy : null }
        { /* if backend room.selected_phrase_id is false render PhraseContainer  else load the game as a guesser */ }

        <PhraseContainer match={this.props.match} />
        <GamePlay match={this.props.match} /> }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    busySignal: state.busySignal
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
