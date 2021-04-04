import React, { Component } from 'react'

class CanvasContainer extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.contextRef = React.createRef()
    this.state = {
      isDrawing: false,
      color: 'yellow',
      lineWidth: 7
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    // double pixel depth for higher res
    // need .scale
    canvas.width = 500
    canvas.height = 500
    canvas.style.width = `${500}px`
    canvas.style.height = `${500}px`

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.strokeStyle = this.state.color
    context.lineWidth = this.state.lineWidth
    this.contextRef.current = context
  }


  startDrawing = (event) => {
    console.log(event)
    const {offsetX, offsetY} = event.nativeEvent
    this.contextRef.current.beginPath()
    this.contextRef.current.moveTo(offsetX, offsetY)
    this.setState({ isDrawing: true })
  }

  stopDrawing = (event) => {
    this.contextRef.current.closePath()
    this.setState({ isDrawing: false })
  }

  drawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    //console.log('im drawing');
    const {offsetX, offsetY} = event.nativeEvent
    this.contextRef.current.lineTo(offsetX, offsetY)
    this.contextRef.current.stroke()
  }

  render() {
    return (
      <canvas
        onMouseDown={event => this.startDrawing(event)}
        onMouseUp={event => this.stopDrawing(event)}
        onMouseMove={event => this.drawing(event)}
        ref={this.canvasRef}
      />
    )
  }
}

export default CanvasContainer
