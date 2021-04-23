import React from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { API_ROOT, PARSE_JSON, HEADERS } from '../constants'
import { getRoom, setPhrase, editSelectedRoom } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match


  componentDidMount = () => {
    // dispatch will update state for direct link viewers
    // get the room and set it to selectedRoom in state
    this.props.getRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    //console.log('GameContainer didUpdate')
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!');

    // TODO: add a remove selected_room here
    this.props.editSelectedRoom({room_id: this.matchObj.params.id, })
  }

  uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>

  render() {

    return (
      <div>
        {
          this.props.selectedRoom
          ?
          (
          this.props.selectedRoom.selected_phrase_id
              ?
              <GamePlay match={this.props.match} />
              :
              <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} handleClick={this.handleClick} />
          )
          :
          (this.uhOh)
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    currentUser: state.users.user,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    setPhrase: phraseId => { dispatch(setPhrase(phraseId)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
