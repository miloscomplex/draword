import React from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'
import Canvas from '../components/canvas/CanvasGuesser'
import ChatArea from '../components/chatBox/ChatArea'
import cable from '../services/Cable'
import { connect } from 'react-redux'
import { getRoom } from '../redux/actions'

class GamePlay extends React.Component {

  componentDidMount = () => {
    this.props.getRoom(this.props.match.params.id)
  }

  componentWillUnmount = () => {

    console.log('GamePlayGuesser unmounted');
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
  }


  render() {
    /* this.props.match.params ==> what's the url for the room */
    return (
      <React.Fragment>
      <div className='phraseReminder'> Good Luck! Remember think of Karaoke Songs</div>
      <div id='wrapper'>
        <div id='canvas'>
          <Canvas  params={this.props.match.params} />
          <Timer />
          <Score />
        </div>
        <ChatArea params={this.props.match.params} phrase={this.props.selectedPhrase} />
      </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedPhrase: state.rooms.selectedRoom.phrase
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRoom: roomId => { dispatch(getRoom(roomId)) }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(GamePlay)
