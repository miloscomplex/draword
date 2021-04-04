import React, { Component } from 'react'

class Canvas extends Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {

    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId

    context.fillStyle = '#EEEEEE'
    context.fillRect(30, 30, context.canvas.width / 2, context.canvas.height / 2)
  }

  const draw = (ctx, frameCount) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = '#000000'
    ctx.beginPath()
    ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    ctx.fill()
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
