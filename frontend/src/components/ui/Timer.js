import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'
import cable from '../../services/Cable'
import { connect } from 'react-redux'
import { editSelectedRoom } from '../../redux/actions'

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      room_id: this.props.match.params.id,
      time: 0,
      isOn: false,
      start: 0
    }
    this.timerChannelRef = null
  }

  timerChannel = () => {
    this.timerChannelRef = cable.subscriptions.create({
    channel: `TimersChannel`,
    room_id: this.props.selectedRoom.id,
    },
      {connected: () => {
        console.log('timerChannel connected!')
      },
      disconnected: () => {
        console.log('timerChannel disconnected!')
      },
      received: data => {
        this.handleReceivedData(data)
        console.log('timerChannel data received', data)
      },
    })
  }

  handleReceivedData = data => {
    //console.log('receivedData= ', data);
    //this.props.updateSelectedRoom(data)
    this.setState({
      time: Math.round( (Date.now() - this.state.start) / 1000 )
    })
  }

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval( () => {
      this.props.editSelectedRoom({ room_id: this.state.room_id, timer: Math.round( (Date.now() - this.state.start) / 1000) })
      },  1000)
  }

  stopTimer = () => {
    this.setState({isOn: false})
    clearInterval(this.timer)
  }

  resetTimer = () => {
    this.setState({time: 0, isOn: false})
  }

  elapsedTime = () => {
    this.endTime = new Date()
    let timeDiff = this.endTime - this.startTime
    // remove miliseconds & round seconds
    this.stopTime = Math.round(timeDiff / 1000)
    return this.stopTime
  }

  componentDidMount = () => {
    //this.startTimer()
    console.log(this.props.match);
  }

  render() {
    return (
      <div className='timer'>
        Elapsed Time: {this.state.time}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editSelectedRoom: roomObj => { dispatch(editSelectedRoom(roomObj)) }
  }
}

export default connect(null, mapDispatchToProps)(Timer)
