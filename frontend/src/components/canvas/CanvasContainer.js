import React from 'react'
import ToolBox from './ToolBox'
import Timer from '../ui/Timer'
import Score from '../ui/Score'
import Canvas from './Canvas'
import ChatArea from '../chatBox/ChatArea'
import PhraseContainer from '../phraseSelector/PhraseContainer'
import cable from '../../services/Cable'
import { connect } from 'react-redux'
import { editRoomPhrase, getRoom } from '../../redux/actions'

class GamePlay extends React.Component {

  state = {
    playing: false
  }

  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match.params
    const selectedPhrase = this.props.selectedPhrase

    return (
      <div>
            {
            this.state.playing ?
              <React.Fragment>
                <div className='phraseReminder'> Your phrase/word is <strong>{ selectedPhrase }</strong></div>
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
                <p>Your Word/Phrase is { selectedPhrase }</p>
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
    selectedPhrase: state.rooms.selectedRoom.phrase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
