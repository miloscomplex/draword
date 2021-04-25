import React from 'react'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'
import Callout from '../components/ui/Callout'
import cable from '../services/Cable'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import { connect } from 'react-redux'
import { getPhrase, editSelectedRoom, editUser, loadRooms } from '../redux/actions'

class GamePlay extends React.Component {

  state = {
    playing: false,
    selectPhrase: false,
  }

  componentWillUnmount = () => {

    console.log('GamePlay unmounted')
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    this.props.releasePhrase({ room_id: this.props.selectedRoom.id, phrase_id: null })
    this.props.editUser({ user_id: this.props.currentUser.id, room_id: null, is_drawing: false })
  }

  componentDidMount = () => {
    //this.props.getPhrase(this.props.phrase.id)
    // set room if user was directly linked here
    // ADD FOREIGN key user
    const { match, currentUser } = this.props

    this.props.addUserToRoom({ user_id: currentUser.id, room_id: match.params.id, is_drawing: currentUser.is_drawing })
  }

  handleClick = () => {
    this.setState({ playing: true })
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match
    //console.log('roomURL= ', roomURL);

    return (
      <div>
          {
            this.state.playing ?
              <React.Fragment>

                <Callout selectedRoom={this.props.selectedRoom} currentUser={this.props.currentUser} />

                { !this.state.selectPhrase && <PhraseContainer match={this.props.match} /> }

                <div id='wrapper'>
                  <div id='canvas'>
                    <Canvas  match={roomURL} isDrawing={this.props.currentUser.isDrawing}  />
                    <Timer />
                    <Score />
                  </div>
                  <ChatArea match={roomURL} />
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <h2>Reminder:</h2>
                <p>Click to start. The timer will begin when the drawer initializes the round</p>
                <button onClick={this.handleClick}>Click to start!</button>
              </React.Fragment>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
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
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
