import React from 'react'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom, editUser, removeUser } from '../redux/actions'


class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id


  componentDidMount = () => {
    // dispatch will update state for direct link viewers
    // get the room and set it to selectedRoom in state
    const { match, currentUser } = this.props
    this.props.setSelectedRoom(match.params.id)
  }

  componentDidUpdate() {
    //console.log('GameContainer didUpdate')
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!');
    const { match, currentUser } = this.props
    this.props.removeUserFromRoom({ user_id: currentUser.id, room_id: null, is_drawing: currentUser.is_drawing })

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
          <GamePlay match={this.props.match} />
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
    removeSelectedRoom: () => dispatch({type: 'REMOVE_SELECTED_ROOM',}),
    editUser: userObj => { dispatch(editUser(userObj)) },
    addUserToRoom: userObj => { dispatch(editUser(userObj)) },
    removeUserFromRoom: userObj => { dispatch(editUser(userObj)) },
    removeUser: userObj => { dispatch(removeUser(userObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
