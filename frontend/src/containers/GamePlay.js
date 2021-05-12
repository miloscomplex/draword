import React from 'react'
import PhraseSelection from '../components/gamePlay/PhraseSelection'
import MainGamePlay from '../components/gamePlay/MainGamePlay'
import EndOfGame from '../components/gamePlay/EndOfGame'

import cable from '../services/Cable'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { getPhrase, editSelectedRoom, editUser, loadRooms } from '../redux/actions'
import rootReducer from '../redux/reducers/rootReducer'


class GamePlay extends React.Component {

  state = {
    playing: false,
  }

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
    //this.props.loadGamePlayMsg(this.props.selectedRoom.id)
  }

  handleReceivedData = data => {
    this.props.sendGamePlayMsg(data)
    //this.props.loadGamePlayMsg(this.props.selectedRoom.id)
    // maybe have switch statements here to handle game flow

  }

  componentWillUnmount = () => {
    console.log('GamePlay unmounted')
    // removing for now seems redundant 
    // cable.subscriptions.subscriptions.forEach( subscription => {
    //   subscription.unsubscribe()
    // })
    cable.disconnect()

    // now null-ing is executed by unsubscribe of action_cable for gamePlay
  }

  renderContent = () => {
    switch (this.props.gameStatus) {
      case 'start':
        return <PhraseSelection match={this.props.match} currentUser={this.props.currentUser} />
      case 'main':
        return <MainGamePlay match={this.props.match} />
      case 'end':
        return <EndOfGame match={this.props.match} />
      default:
        return <h2>Something isn't quite right</h2>
    }
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match

    const { gameStatus } = this.props.gameStatus
    return (
      <div>
          Anything to display?
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
    sendGamePlayMsg: playObj => dispatch({ type: 'UPDATE_GAME_STATE', payload: playObj }),
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
