import React, { Component } from 'react'
import { API_ROOT, API_WS_ROOT, HEADERS } from '../../constants';
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
      canvasHeight: 500,
      roomId: this.props.params.id,
    }
    this.dataCache = null
  }

  componentDidMount() {
    this.configCanvas()
    this.handleGetFetch()
    this.canvasChannel()
  }

  handleGetFetch = () => {
    fetch(`${API_ROOT}/canvas/${this.state.roomId}`)
      .then(res => res.json())
      .then(drawings => this.setState({ drawings }))
  }

  canvasChannel = () => cable.subscriptions.create({
    channel: `CanvasChannel`,
    id: this.state.roomId
    },
      {connected: () => {
        console.log('CanvasChannel connected!')
      },
        disconnected: () => {
          console.log('CanvasChannel disconnected!')
        },
        received: data => {
          this.dataCache = data
          this.drawOnCanvas(data)
          console.log('CanvasChannel data received', data)
        },
        send: data => {
          console.log('CanvasChannel sent data', data)
          //this.handlePostFetch(data)
        }
    })

  handlePostFetch = drawingObj => {
    if ( this.dataCache === drawingObj ) { return }
    // kill it if it's a duplicate
    fetch(`${API_ROOT}/canvas`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(drawingObj)
    });
  }

  handleReceivedCanvasObj = response => {
    const { drawing } = response
    if (drawing !== this.state.drawings ) {
      this.setState({
        drawings: [...this.state.drawings, drawing]
      })
    }
  }

  startDrawing = (event) => {
    //console.log(event)
    if (this.state.isDrawing) {
      return
    }
    const {offsetX, offsetY} = event.nativeEvent
    // this.contextRef.current.beginPath()
    // this.contextRef.current.moveTo(offsetX, offsetY)
    this.setState({ isDrawing: true })
    this.handlePostFetch(
    {   action: 'beginPath',
        offsetX: offsetX,
        offsetY: offsetY,
        room_id: this.state.roomId
    })
  }

  stopDrawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    const {offsetX, offsetY} = event.nativeEvent
    // this.contextRef.current.closePath()
    this.setState({ isDrawing: false })
    // let saveVal = this.contextRef.current.save()
    //console.log(this.contextRef.current)
    this.handlePostFetch(
    {   action: 'closePath',
        offsetX: offsetX,
        offsetY: offsetY,
        room_id: this.state.roomId
    })
  }

  drawing = (event) => {
    if (!this.state.isDrawing) {
      return
    }
    //console.log('im drawing');
    const {offsetX, offsetY} = event.nativeEvent
    // this.contextRef.current.lineTo(offsetX, offsetY)
    // this.contextRef.current.stroke()
    this.handlePostFetch(
    {   action: 'lineTo',
        offsetX: offsetX,
        offsetY: offsetY,
        room_id: this.state.roomId
    })
  }

  configCanvas = () => {
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
  }

  drawOnCanvas = (drawingObj) => {
    console.log('hello', drawingObj);
    const {offsetX, offsetY} = drawingObj
    switch (drawingObj.action) {
      case 'beginPath':
        this.contextRef.current.beginPath()
        this.contextRef.current.moveTo(offsetX, offsetY)
        this.setState({ isDrawing: true });
        this.contextRef.current.stroke();
        break

      case 'lineTo':
        this.contextRef.current.lineTo(offsetX, offsetY)
        this.contextRef.current.stroke();
        break

      case 'closePath':
        this.contextRef.current.closePath()
        let saveVal = this.contextRef.current.save();
        this.setState({ isDrawing: false })
        break

      default:
        return
    }
  }

  render() {
    //console.log('cable= ', cable)
    //console.log('this.canvasChannel', this.canvasChannel());
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