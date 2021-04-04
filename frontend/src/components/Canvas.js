import React, { Component } from 'react'
//import PureCanvas from './PureCanvas'

class Canvas extends React.Component {

  state = {
    pos: ''
  }

  componentDidMount() {
    const canvas = this.refs.canvas
    const ctx = canvas.getContext('2d')
  }

  handleMouseDown = ( event ) => {
    console.log(event)
    this.setState({
      pos: [event.clientX, event.clientY]
    })
  }

  render() {
    return(
      <div>
        <canvas
          ref='canvas'
          width={500}
          height={500}
          onMouseDown={ event => this.handleMouseDown(event)}
        />
      </div>
    )
  }
}

export default Canvas
