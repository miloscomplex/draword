import React from 'react'

class EndOfGame extends React.Component {

  matchId = this.props.match.params.id

  componentDidMount = () => {
    // ping the db to update status
    this.props.setSelectedRoom(this.matchId)
    console.log('match= ', this.props.match)
  }

  render() {
    const { selectedRoom, editSelectedRoom, match } = this.props

    return (
      <div className='wrapper'>
        <h2>
          { `Good Job ${selectedRoom.title}! This is the end of Game` }
        </h2>
        <p>
          Wow you won ! { `The correct answer was ${selectedRoom.phrase.phrase}`}
        </p>
         <button onClick={event => editSelectedRoom({room_id: match.params.id, status: 'preplay', selected_phrase_id: null, drawer_id: null }) }>start over
         </button>
      </div>
    )
  }

}

export default EndOfGame
