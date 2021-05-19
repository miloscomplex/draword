import React from 'react'

class Timer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      time: 0,
      isOn: false,
      start: 0
    }
  }

  startTimer = () => {
    this.setState({
      isOn: true,
      time: this.state.time,
      start: Date.now() - this.state.time
    })
    this.timer = setInterval( () => this.setState({
      time: Math.round( (Date.now() - this.state.start) / 1000 )
    }), 1000)
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

  componentDidMount() {
    this.startTimer()
  }

  render() {
    return (
      <div className='timer'>
        Elapsed Time: {this.state.time}
      </div>
    )
  }
}

export default Timer
