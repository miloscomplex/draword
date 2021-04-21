import React, { Component } from 'react'

class ToolBox extends React.Component {
  render() {
    return (
      <div id='toolbox'>
       <li onClick={event => this.props.handleClick(event)}>clear</li>
      </div>
    )
  }
}

export default ToolBox
