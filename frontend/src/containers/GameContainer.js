import React from 'react'
import GamePlay from './GamePlay'
import GamePlayGuesser from './GamePlayGuesser'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON } from '../constants'
import { getRoom, setPhrase } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match

  // make a call to the server for updated Room
  // dispatch will update state good for direct link
  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    //console.log('GameContainer didUpdate')
  }

  render() {
    //console.log('this.props.selectedRoom= ', this.props.selectedRoom);

    // match is browser props
    // console.log('this.props.match= ', this.props.match);
    const uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchId.url}</code> isn't a valid room</h2>
    const phraseId = this.props.selectedRoom.selected_phrase_id
    return (
      <div>
        { selectedPhrase ?
              <GamePlay match={this.props.match} />
              :
              <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    selectedPhrase: state.phrases.selectedPhrase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
    setPhrase: phraseId => { dispatch(setPhrase(phraseId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
