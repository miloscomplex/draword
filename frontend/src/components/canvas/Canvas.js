import React, { Component } from 'react'
import cable from '../../services/Cable'

class Canvas extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.contextRef = React.createRef()
    this.state = {
      isDrawing: false,
      color: 'yellow',
      lineWidth: 7,
      drawings: [],
      canvasWidth: 500,
      canvasHeight: 500
    }
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    // double pixel depth for higher res
    // need .scale
    canvas.width = this.state.canvasWidth
    canvas.height = this.state.canvasHeight
    canvas.style.width = `${this.state.canvasWidth}px`
    canvas.style.height = `${this.state.canvasHeight}px`

    const context = canvas.getContext('2d')
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = this.state.color
    context.lineWidth = this.state.lineWidth
    context.miterLimit = 2
    this.contextRef.current = context
    this.canvasChannel()
  }

  canvasChannel = () => {
    cable.subscriptions.create({
    channel: `CanvasChannel`,
    },
      {connected: () => {
        console.log('CanvasChannel connected!')
      },
        disconnected: () => {
          console.log('CanvasChannel disconnected!')
        },
        received: data => {
          this.handleReceivedChat(data)
          console.log('CanvasChannel data received')
        }
    })
  }

  handleReceivedCanvasObj = response => {
    const { drawing } = response
    this.setState({
      drawings: [...this.state.drawings, drawing]
    })
  }

  recordDrawing = (path, x, y) => {
    const newDrawing = {
      path: path,
      x: x,
      y: y
    }

    let joined = this.state.drawings.concat(newDrawing)
    this.setState({ drawings: joined })
  }

  startDrawing = (event) => {
    console.log(event)
    const {offsetX, offsetY} = event.nativeEvent
    this.contextRef.current.beginPath()
    this.contextRef.current.moveTo(offsetX, offsetY)
    this.setState({ isDrawing: true })
    this.recordDrawing('beginPath()', offsetX, offsetY)
  }

  stopDrawing = (event) => {
    const {offsetX, offsetY} = event.nativeEvent
    this.contextRef.current.closePath()
    this.setState({ isDrawing: false })
    //let saveVal = this.contextRef.current.save()
    console.log(this.contextRef.current)
    this.recordDrawing('closePath()', offsetX, offsetY)
  }

  drawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    //console.log('im drawing');
    const {offsetX, offsetY} = event.nativeEvent
    this.contextRef.current.lineTo(offsetX, offsetY)
    this.contextRef.current.stroke()
    this.recordDrawing('lineTo', offsetX, offsetY)
  }

  render() {
    return (
        <canvas
          onMouseDown={event => this.startDrawing(event)}
          onMouseUp={event => this.stopDrawing(event)}
          onMouseMove={event => this.drawing(event)}
          onMouseLeave={event => this.stopDrawing(event)}
          ref={this.canvasRef}
        />
    )
  }
}

export default Canvas
