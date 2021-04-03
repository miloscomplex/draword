import React, { Component } from 'react'

class Canvas extends Component {

  mouseDown = (event) => {
    console.log("mouseDown")
  }


  render() {
    return (
      <div>
        <h1>Hello World</h1>
        <canvas onMouseDown={event => this.mouseDown(event)} id="canvas" width="500" height="500"></canvas>

      </div>
    )
  }
}

export default Canvas
