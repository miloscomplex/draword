import React, { Component } from 'react'

class Canvas extends Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')
    context.fillRect(0, 0, canvas.width, canvas.height)
  }

  mouseDown = (event) => {
    console.log('mouseDown')
    console.log(event, this.context);
    // this.context.beginPath()
    // this.context.arc(event.clientX, event.clientY, 10, 0, Math.PI*2)
    // this.context.fillStyle = '#0095DD'
    // this.context.fill()
    // this.context.closePath()
  }


  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <canvas onMouseDown={event => this.mouseDown(event)} id='canvas' ref={this.canvasRef} width='500' height='500'></canvas>

      </div>
    )
  }
}

export default Canvas
