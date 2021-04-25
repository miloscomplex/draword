import React from 'react'

class Callout extends React.Component {

  render() {
    return (
      this.props.currentUser.is_drawing
        ?
      (<div className='phraseReminder'>
        Your phrase/word is <strong>{ this.props.selectedRoom.phrase.phrase }</strong>
      </div>)
      :
      (<div className='phraseReminder'>
        Remember to think of popular Karaoke songs
      </div>)
    )
  }
}

export default Callout
