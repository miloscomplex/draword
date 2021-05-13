import React from 'react'
import PrePlay from '../components/gamePlay/PrePlay'
import PhraseSelection from '../components/gamePlay/PhraseSelection'
import MainGamePlay from '../components/gamePlay/MainGamePlay'
import EndOfGame from '../components/gamePlay/EndOfGame'

import cable from '../services/Cable'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { getPhrase, editSelectedRoom, editUser, loadRooms, createOrFindUser, setSelectedRoom } from '../redux/actions'
import rootReducer from '../redux/reducers/rootReducer'


class GamePlay extends React.Component {

  // match is this browser props
  matchObj = this.props.match
  matchId = this.props.match.params.id

  // need to add action cable to have overlays and announcements broadcasted
  gamePlayChannel = () => {
    cable.subscriptions.create({
    channel: `GamePlaysChannel`,
    room_id: this.props.selectedRoom.id,
    user_id: this.props.currentUser.id
    },
      {connected: () => {
        console.log('GamePlaysChannel connected!')
      },
      disconnected: () => {
        console.log('GamePlaysChannel disconnected!')
      },
      received: data => {
        this.handleReceivedData(data)
        console.log('GamePlaysChannel data received')
      }
    })
  }

  componentDidMount = () => {
    // init cable
    this.gamePlayChannel()
  }

  componentWillUnmount = () => {
    console.log('GamePlay unmounted')
    // removing for now seems redundant
    console.log('cable.subscriptions', cable.subscriptions);
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    // now null-ing is executed by unsubscribe of action_cable for gamePlay
  }

  handleDrawClick = userObj => {
    const { currentUser } = this.props
    const statusStr = 'start'

    this.props.editSelectedRoom({room_id: this.matchId, drawer_id: currentUser.id, status: statusStr })
  }

  handleGuessClick = userObj => {
    const statusStr = 'start'
    // don't forget to pass room_id elsewise sets it to null
    this.props.editSelectedRoom({ room_id: this.matchId, status: statusStr })
  }

  renderBusy = () => {
    return <span className='loading-message'> </span>
  }


  renderContent = () => {
    const { selectedRoom, currentUser, match, busySignal, setSelectedRoom } = this.props

    switch (this.props.gameStatus) {
      case 'preplay':
        return <PrePlay
                  drawer_id={selectedRoom.drawer_id}
                  currentUser={currentUser}
                  handleDrawClick={this.handleDrawClick} handleGuessClick={this.handleGuessClick}
                />
      case 'start':
        return <PhraseSelection selectedRoom={selectedRoom} currentUser={currentUser} />
      case 'playing':
        return <MainGamePlay match={match} />
      case 'end':
        return <EndOfGame match={match} setSelectedRoom={setSelectedRoom}/>
      default:
        return <h2>Something isn't quite right...</h2>
    }
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match

    const { gameStatus, busySignal } = this.props
    return (
      <div>
          { this.renderContent() }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    gameStatus: state.rooms.selectedRoom.status,
    selectedPhrase: state.selectedPhrase,
    currentUser: state.users.user,
    busySignal: state.busySignal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //releasePhrase: () => dispatch({ type: 'RELEASE_PHRASE' }),
    getPhrase: phraseId => { dispatch(getPhrase(phraseId)) },
    releasePhrase: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    editUser: userObj => { dispatch(editUser(userObj)) },
    addUserToRoom: userObj => { dispatch(editUser(userObj)) },
    loadRooms: () => { dispatch(loadRooms()) },
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) },
    setSelectedRoom: roomId => { dispatch(setSelectedRoom(roomId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
