import React from 'react'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import ChatArea from '../components/chatBox/ChatArea'
import cable from '../services/Cable'
import { connect } from 'react-redux'
import { getPhrase, editSelectedRoom } from '../redux/actions'

class GamePlay extends React.Component {

  state = {
    playing: false,
  }

  componentWillUnmount = () => {

    console.log('GamePlay unmounted')
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    this.props.releasePhrase( {room_id: this.props.selectedRoom.id, phrase_id: null} )
  }

  componentDidMount = () => {
    //this.props.getPhrase(this.props.phrase.id)
  }

  handleClick = () => {
    this.setState({ playing: true })
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match
    console.log('roomURL= ', roomURL);

    return (
      <div>
          {
            this.state.playing ?
              <React.Fragment>
                { this.props.currentUser.is_drawing
                  ?
                (<div className='phraseReminder'>
                  Your phrase/word is <strong>{ this.props.selectedRoom.phrase.phrase }</strong>
                </div>)
                :
                (<div className='phraseReminder'>
                  Remember to think of popular Karaoke songs
                </div>)
                }
                <div id='wrapper'>
                  <div id='canvas'>
                    <Canvas  match={roomURL} />
                    <Timer />
                    <Score />
                  </div>
                  <ChatArea match={roomURL} />
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <h2>Reminder:</h2>
                <p>Click to start the timer will begin when the drawer initializes the round</p>
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
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
