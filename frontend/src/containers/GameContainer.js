import React from 'react'
import PrePlay from '../components/gamePlay/PrePlay'
import GamePlay from './GamePlay'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom, createOrFindUser } from '../redux/actions'

class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  state = {
    displayPrePlay: true,
  }

  componentDidMount = () => {

    const { currentUser } = this.props

    // get the room and set it to selectedRoom in state
    this.props.setSelectedRoom(this.matchId)
    this.props.createOrFindUser({ user_id: currentUser.id, room_id: this.matchId })
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!')
    // channel removes user from room on disconnect FAIL SAFE for closed window
  }

  handleDrawClick = userObj => {
    const { currentUser } = this.props
    const statusStr = 'start'

    this.props.editSelectedRoom({room_id: this.matchId, drawer_id: currentUser.id, status: statusStr })
    this.setState({ displayPrePlay: false })
  }

  handleGuessClick = userObj => {
    const statusStr = 'start'
    // don't forget to pass room_id elsewise sets it to null
    this.props.editSelectedRoom({ room_id: this.matchId, status: statusStr })
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
                drawer_id={selectedRoom.drawer_id}
                currentUser={currentUser}
                handleDrawClick={this.handleDrawClick} handleGuessClick={this.handleGuessClick}
              />
            :
              <GamePlay match={this.matchObj} />
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
    createOrFindUser: userObj => { dispatch(createOrFindUser(userObj)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
