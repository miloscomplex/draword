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

  isDrawer = () => {
    const { selectedRoom, user, timer } = this.props

    return (
      selectedRoom.drawer_id === user.id &&
      (
        <div className='phraseReminder'>
          <h4>Hey there drawer do you want to record your winning?</h4>
          <p>It looks like it only took you guesser's <strong>{ timer.time }</strong> seconds to guess the phrase <strong>{ selectedRoom.phrase.phrase }</strong></p>
          <button>submit your time</button>
        </div>
      )
    )
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
        <button onClick={ () => this.handleClick() }>start over
        </button>
        { this.isDrawer() }
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
    selectedRoom: state.rooms.selectedRoom,
    user: state.users.user,
    timer: state.timer
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EndOfGame)
