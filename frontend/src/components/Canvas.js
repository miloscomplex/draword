import React, { Component } from 'react'

class Canvas extends Component {

  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }

  componentDidMount() {
    const canvas = this.canvasRef.current
    const context = canvas.getContext('2d')
  }

  mouseDown = (event) => {
    console.log('mouseDown')
    console.log(this.canvas);
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
