import React from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON } from '../constants'
import { getRoom } from '../redux/actions'

class GameContainer extends React.Component {

  currentRoom = null
  matchId = this.props.match

  componentDidMount = () => {
    this.props.getRoom(this.matchId.params.id)
  }

  componentDidUpdate() {
    console.log('didUpdate')
  }

  render() {

    // should have a verification of room url

    // match is browser props
    console.log('this.props.match= ', this.props.match);
    const busy = 'busy'
    const notBusy = 'not busy'
    const uhOh = <h2>Whoops! something went wrong maybe {this.matchId.url} isn't a valid room</h2>
    return (
      <div>
        { this.props.busySignal ? busy : notBusy }
        { /* if backend room.selected_phrase_id is false render PhraseContainer  else load the game as a guesser */ }
        { this.props.selectedRoom ?
          <React.Fragment>
            <PhraseContainer match={this.props.match} />
            <GamePlay match={this.props.match} />
          </React.Fragment>
          :
          uhOh
         }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    busySignal: state.busySignal,
    room: state.phrases.phrasesList,
    selectedRoom: state.rooms.selectedRoom
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
