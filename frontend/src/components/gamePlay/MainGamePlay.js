import React from 'react'
import Timer from '../ui/Timer'
import Score from '../ui/Score'
import Canvas from '../canvas/Canvas'
import ChatArea from '../chatBox/ChatArea'
import Callout from '../ui/Callout'
import { connect } from 'react-redux'

class MainGamePlay extends React.Component {

  render() {

    const { selectedRoom, currentUser, match } = this.props

    return (
      <React.Fragment>
        <Callout selectedRoom={selectedRoom} currentUser={currentUser} />

        <div id='wrapper'>
          <div id='canvas'>
            <Canvas match={match} />
            <Timer />
          </div>
          <ChatArea match={match} currentUser={currentUser} />
        </div>
      </React.Fragment>
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

export default connect(mapStateToProps)(MainGamePlay)
