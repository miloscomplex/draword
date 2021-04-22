import React from 'react'
import GamePlay from './GamePlay'
import GamePlayGuesser from './GamePlayGuesser'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON, HEADERS } from '../constants'
import { getRoom, setPhrase, editRoom } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match

  // make a call to the server for updated Room
  // dispatch will update state good for direct link
  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    console.log('GameContainer didUpdate')
    this.handlePostFetch()
  }

  handlePostFetch = () => {
    fetch(`${API_ROOT}/sessions`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({selectedRoom: this.props.selectedRoom})
    });
  }


  handleClick = (matchObjId, phraseObjId) => {
    //console.log(matchObjId, phraseObjId)
    this.props.setRoom( {room_id: matchObjId, phrase_id: phraseObjId} )
    // do not get why this works and below throws an error

    //this.props.setPhrase( {room_id: matchObjId, phrase_id: phraseObjId} )
  }

  render() {
    //console.log('this.props.selectedRoom= ', this.props.selectedRoom);

    // match is browser props
    // console.log('this.props.match= ', this.props.match);
    const uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>
    //const phrase = this.props.selectedRoom.selected_phrase_id
    return (
      <div>
        {
          this.props.selectedRoom
          ?
          (
          this.props.selectedRoom.selected_phrase_id
              ?
              <GamePlayGuesser match={this.props.match} />
              :
              <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} handleClick={this.handleClick} />
          )
          :
          (uhOh)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    selectedPhrase: state.selectedPhrase.phrase
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
    setRoom: phraseObj => { dispatch(editRoom(phraseObj)) },
    setPhrase: phraseId => { dispatch(setPhrase(phraseId)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
