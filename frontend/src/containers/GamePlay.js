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
import { editRoomPhrase, getRoom } from '../redux/actions'

class GamePlay extends React.Component {

  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentWillUnmount = () => {

    console.log('GamePlay unmounted');
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    //this.props.releasePhrase( {room_id: this.props.match.params.id, selected_phrase_id: null, has_drawer: false } )
  }

  render() {
    /* this.props.match.params ==> what's the url for the room */
    const roomURL = this.props.match

    return (
      <div>
            {
              this.props.selectedRoom.phrase
            ?
              <CanvasContainer match={roomURL} />
            :
              <PhraseContainer match={roomURL} getRoom={this.props.getRoom} />
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
    releasePhrase: phraseObj => { dispatch(editRoomPhrase(phraseObj)) },
    getRoom: roomId => { dispatch(getRoom(roomId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
