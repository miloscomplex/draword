import React from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/Canvas'
import CanvasContainer from '../components/canvas/CanvasContainer'
import ChatArea from '../components/chatBox/ChatArea'
import PhraseContainer from '../components/phraseSelector/PhraseContainer'
import cable from '../services/Cable'
import { connect } from 'react-redux'
import { getPhrase, editRoom, removeUser } from '../redux/actions'

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
    this.props.removeUser(this.props.currentUser)
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
                <div className='phraseReminder'> <strong>Remember think of karaoke songs</strong></div>
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
                <h2>Your are a Guesser:</h2>
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
    currentUser: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //releasePhrase: () => dispatch({ type: 'RELEASE_PHRASE' }),
    getPhrase: phraseId => { dispatch(getPhrase(phraseId)) },
    releasePhrase: phraseObj => { dispatch(editRoom(phraseObj)) },
    removeUser: userObj => { dispatch(removeUser(userObj)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
