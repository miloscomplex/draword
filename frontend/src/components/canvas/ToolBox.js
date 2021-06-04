import React from 'react'

class ToolBox extends React.Component {
  render() {
    return (
      <div id='toolbox'>
        <li onClick={event => this.props.handleClearClick(event)}>clear
        </li>
        <li className='color-selector yellow'> </li>
        <li className='color-selector red'> </li>
        <li className='color-selector blue'> </li>
        <li className='color-selector green'> </li>
        <li className='color-selector white'> </li>
      </div>
    )
  }
}

export default ToolBox
