import React from 'react'
import PhraseContainer from '../phraseSelector/PhraseContainer'
import GuesserWaitingRoom from '../ui/GuesserWaitingRoom'

class PhraseSelection extends React.Component {

  render() {
    const { selectedRoom, currentUser } = this.props

    return (
      <div className='wrapper'>
        {
          currentUser.id === selectedRoom.drawer_id
          ?
          <PhraseContainer match={this.props.match} />
          :
          <GuesserWaitingRoom match={this.props.match}/>
        }
      </div>
    )
  }

}

export default PhraseSelection
