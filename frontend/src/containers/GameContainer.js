import React from 'react'
import PrePlay from '../components/gamePlay/PrePlay'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom, editUser, createOrFindUser, removeUser, gamePlayMsg } from '../redux/actions'

class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  state = {
    displayPrePlay: true,
  }

  componentDidMount = () => {
    // get the room and set it to selectedRoom in state
    const { match, currentUser } = this.props

    // TODO: Create a busy state so it waits to continue to set other attributes after user creation

    // is this necssary to have selected room?
    this.props.setSelectedRoom(match.params.id)
    this.props.createOrFindUser({ user_id: currentUser.id, room_id: match.params.id })
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!')
  }

  handleDrawClick = userObj => {
    const { match, currentUser } = this.props
    const statusStr = 'start'
    
    this.props.editSelectedRoom({room_id: match.params.id, drawer_id: currentUser.id, status: statusStr })
    this.setState({ displayPrePlay: false })
  }

  handleGuessClick = userObj => {
    const { match } = this.props
    const statusStr = 'start'
    // don't forget to pass room_id elsewise sets it to null
    this.props.editSelectedRoom({ room_id: match.params.id, status: statusStr })
    this.setState({ displayPrePlay: false })
  }

  uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>

  render() {

    const { selectedRoom, currentUser, busySignal } = this.props

    return (
      <div>
        {
          selectedRoom
          ?
          (
            this.state.displayPrePlay ?
              <PrePlay
                hasDrawer={selectedRoom.has_drawer}
                currentUser={currentUser}
                handleDrawClick={this.handleDrawClick} handleGuessClick={this.handleGuessClick}
              />
            :
              <GamePlay match={this.props.match} />
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
    busySignal: state.busySignal,
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    removeSelectedRoom: () => dispatch({type: 'REMOVE_SELECTED_ROOM',}),
    createOrFindUser: userObj => { dispatch(createOrFindUser(userObj)) },
    editUser: userObj => { dispatch(editUser(userObj)) },
    addUserToRoom: userObj => { dispatch(editUser(userObj)) },
    removeUserFromRoom: userObj => { dispatch(editUser(userObj)) },
    removeUser: userObj => { dispatch(removeUser(userObj)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
