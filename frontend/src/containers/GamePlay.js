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
import { editRoom } from '../redux/actions'

class GamePlay extends React.Component {

  state = {
    playing: false,
  }

  componentWillUnmount = () => {

    console.log('GamePlay unmounted');
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    this.props.releaseRoom( {room_id: this.props.match.params.id, selected_phrase_id: null, has_drawer: false } )
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match

    return (
      <div>
          {
            this.state.playing ?
              <React.Fragment>
                <div className='phraseReminder'> Your phrase/word is <strong>{ this.props.selectedPhrase.phrase }</strong></div>
                <div id='wrapper'>
                  <div id='canvas'>
                    <Canvas  params={roomURL} />
                    <Timer />
                    <Score />
                  </div>
                  <ChatArea params={roomURL} />
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <h2>Reminder:</h2>
                <p>Your Word/Phrase is {this.props.selectedRoom.phrase}</p>
                <button onClick={this.handleClick}>Click to start!</button>
              </React.Fragment>
          }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom
  }
}

const mapDispatchToProps = dispatch => {
  return {
    releaseRoom: roomObj => { dispatch(editRoom(roomObj)) },
    //getRoom: roomId => { dispatch(getRoom(roomId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
