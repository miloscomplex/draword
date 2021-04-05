import React, { Component } from 'react'
import ToolBox from '../components/canvas/ToolBox'
import Timer from '../components/ui/Timer'
import Score from '../components/ui/Score'


class CanvasContainer extends React.Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
    this.contextRef = React.createRef()
    this.state = {
      isDrawing: false,
      color: 'yellow',
      lineWidth: 7,
      drawings: [[]]
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
    context.lineJoin = 'round'
    context.strokeStyle = this.state.color
    context.lineWidth = this.state.lineWidth
    context.miterLimit = 2
    this.contextRef.current = context
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
      <div id='canvas'>
        <canvas
          onMouseDown={event => this.startDrawing(event)}
          onMouseUp={event => this.stopDrawing(event)}
          onMouseMove={event => this.drawing(event)}
          onMouseLeave={event => this.stopDrawing(event)}
          ref={this.canvasRef}
        />
      <Timer />
      <Score />
      <ToolBox />
      </div>
    )
  }
}

export default CanvasContainer
