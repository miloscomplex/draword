import React, { Component } from 'react'
import Canvas from '../components/Canvas'

class Animation extends React.Component {
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.state = { angle: 0 }
    this.updateAnimationState = this.updateAnimationState.bind(this)
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }))
    this.rAF = requestAnimationFrame(this.updateAnimationState)
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF)
  }

  render() {
    return (
      <div>
        <Canvas angle={this.state.angle} />
      </div>
      )
  }
}

export default Animation
