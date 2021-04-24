import React from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match


  componentDidMount = () => {
    // dispatch will update state for direct link viewers
    // get the room and set it to selectedRoom in state
    this.props.setSelectedRoom(this.props.match.params.id)
  }

  componentDidUpdate() {
    //console.log('GameContainer didUpdate')
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!');

    // TODO: add a remove selected_room here
    // in case they goto somewhere other than newGame
    //this.props.removeSelectedRoom()
  }

  uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>

  render() {

    return (
      <div>
        {
          this.props.selectedRoom
          ?
          (
          {/* need somehting like current_user = is_drawer & currentRoom.id === user.room_id */},
          this.props.selectedRoom.selected_phrase_id
              ?
              <GamePlay match={this.props.match} />
              :
              <PhraseContainer match={this.props.match} getRoom={this.props.getRoom} />
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
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    removeSelectedRoom: () => dispatch({type: 'REMOVE_SELECTED_ROOM',})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
