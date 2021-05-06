import React from 'react'
import PrePlay from '../components/gamePlay/PrePlay'
import GamePlay from './GamePlay'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { setSelectedRoom, editSelectedRoom, editUser, createUser, removeUser, gamePlayMsg } from '../redux/actions'

class GameContainer extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  state = {
    displayPrePlay: true,
  }

  componentDidMount = () => {
  }

  componentDidMount = () => {
    // dispatch will update state for direct link viewers
    // get the room and set it to selectedRoom in state
    const { match, currentUser } = this.props
    
    // create user if one doesn't exist
    !currentUser && this.props.createUser({id: this.props.currentUser.id, is_drawing: false})

    this.props.setSelectedRoom(match.params.id)
    debugger
    this.props.addUserToRoom({ user_id: currentUser.id, room_id: match.params.id, is_drawing: currentUser.is_drawing })
  }

  componentWillUnmount = () => {
    console.log('GameContainer umounted!')
  }

  handleDrawClick = userObj => {
    const { match, currentUser } = this.props
    this.props.editUser({ user_id: currentUser.id, is_drawing: true, room_id: match.params.id })
    this.props.editSelectedRoom({room_id: match.params.id, has_drawer: true})
    this.setState({ displayPrePlay: false })
    this.props.gamePlayMsg({room_id: this.props.selectedRoom, action: 'start'})
  }

  handleGuessClick = userObj => {
    this.props.editUser({ user_id: this.props.currentUser.id, is_drawing: false, room_id: this.props.match.params.id })
    this.setState({ displayPrePlay: false })
  }

  uhOh = <h2>Whoops! something went wrong maybe <code>{this.matchObj.url}</code> isn't a valid room</h2>

  render() {

    const { selectedRoom, currentUser } = this.props

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
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    removeSelectedRoom: () => dispatch({type: 'REMOVE_SELECTED_ROOM',}),
    createUser: userObj => { dispatch(createUser(userObj)) },
    editUser: userObj => { dispatch(editUser(userObj)) },
    addUserToRoom: userObj => { dispatch(editUser(userObj)) },
    removeUserFromRoom: userObj => { dispatch(editUser(userObj)) },
    removeUser: userObj => { dispatch(removeUser(userObj)) },
    gamePlayMsg: game_play => { dispatch(gamePlayMsg(game_play)) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer)
