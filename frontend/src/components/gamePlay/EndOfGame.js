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
  // TODO: some strange behavior is casuing nesting of the selectedRoom
  render() {
    const { selectedRoom, editSelectedRoom, match } = this.props
    const preplay = 'preplay'

    return (
      <div className='wrapper'>
        <h2>
          { `Good Job ${selectedRoom.title}! This is the end of Game` }
        </h2>
        <p>
          Wow you won ! { `The correct answer was ${selectedRoom.phrase.phrase}`}
        </p>
         <button onClick={ event => editSelectedRoom({room_id: selectedRoom.id, status: preplay, selected_phrase_id: null, drawer_id: null }) }>start over
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
