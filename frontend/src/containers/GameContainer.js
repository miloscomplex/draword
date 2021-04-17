import React from 'react'
import GamePlay from './GamePlay'
import GamePlayGuesser from './GamePlayGuesser'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON } from '../constants'
import { getRoom, getPhrase } from '../redux/actions'


class GameContainer extends React.Component {

  matchId = this.props.match

  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    console.log('GameContainer didUpdate')
  }

  render() {

    // match is browser props
    // console.log('this.props.match= ', this.props.match);
    const uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchId.url}</code> isn't a valid room</h2>

    const phraseId = this.props.selectedRoom.selected_phrase_id

    return (
      <div>
        { this.props.selectedRoom ?
          <React.Fragment>
            { phraseId ? <GamePlay match={this.props.match} phrase={phraseId}/> : <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} /> }
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
    selectedRoom: state.rooms.selectedRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
