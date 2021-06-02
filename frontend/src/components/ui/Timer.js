import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'
import cable from '../../services/Cable'
import { connect } from 'react-redux'
import { updateTimer } from '../../redux/actions'

class Timer extends React.Component {

  // TODO: MAKE USE OF REDUCER FOR TIMER AND POST/PUT THE TIME TO THE SERVER
  // DON'T FORGET A RESET OR STOP FOR UNMOUNTING
  timer = null

  startTimer = () => {
    const { updateTimer, timer } = this.props
    updateTimer({
      isOn: true,
      time: 0,
      start: Date.now() - timer.time
    })
    this.timer = setInterval( this.interval,  1000)
  }

  interval = () => {
    const { timer, updateTimer } = this.props
    let timeSpan = Math.round( (Date.now() - timer.start ) / 1000)
    updateTimer({
      start: timer.start,
      time: timeSpan,
      isOn: true
    })
  }

  stopTimer = () => {
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
    this.startTimer()
  }

  componentWillUnmount = () => {
    this.stopTimer()
  }

  render() {
    return (
      <div className='timer'>
        Elapsed Time: { this.props.timer.time }
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTimer: timerObj => { dispatch(updateTimer(timerObj)) }
  }
}

const mapStateToProps = state => {
  return {
    timer: state.timer
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
