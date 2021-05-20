import React from 'react'
import { editSelectedRoom } from '../../redux/actions'
import { connect } from 'react-redux'

class EndOfGame extends React.Component {

  matchId = this.props.match.params.id

  componentDidMount = () => {
    // ping the db to update status
    this.props.setSelectedRoom(this.matchId)
    console.log('match= ', this.props.match)
  }

  handleClick = () => {
    const { selectedRoom, editSelectedRoom } = this.props
    const preplay = 'preplay'

    this.props.editSelectedRoom({room_id: this.props.selectedRoom.id, status: preplay, selected_phrase_id: null, drawer_id: null })
  }

  render() {
    const { selectedRoom } = this.props

    return (
      <div className='wrapper'>
        <h2>
          Wow you won ! { `The correct answer was ${selectedRoom.phrase.phrase}`}
        </h2>
        <p>
          { `Good Job room: ${selectedRoom.title}! This is the end of Game` }
        </p>
        { /* // FIXME: IT WON'T SEND ACTIONCABLE SIGNAL TO CHANGE STATE TO ADDITINAL PLAYERS ODD B/C CHAT AREA WORKS JUST FINE??? */ }
         <button onClick={ event => this.handleClick() }>start over
         </button>
      </div>
    )
  }

}

const mapDispatchToProps = dispatch => {
  return {
    editSelectedRoom: phraseObj => { dispatch(editSelectedRoom(phraseObj)) }
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EndOfGame)
