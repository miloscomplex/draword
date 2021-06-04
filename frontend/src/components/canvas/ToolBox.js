import React from 'react'

class ToolBox extends React.Component {
  render() {
    return (
      <div id='toolbox'>
        <li
          onClick={event => this.props.handleClearClick(event)}>
          clear
        </li>
        <li
          className='color-selector yellow'
          onClick={event => this.props.handleColorChange('yellow')}>
        </li>
        <li
          className='color-selector red'
          onClick={event => this.props.handleColorChange('red')}>
        </li>
        <li
          className='color-selector blue'
          onClick={event => this.props.handleColorChange('blue')}>
        </li>
        <li className='color-selector green'
          onClick={event => this.props.handleColorChange('green')}>
        </li>
        <li
          className='color-selector white'
          onClick={event => this.props.handleColorChange('white')}>
        </li>
      </div>
    )
  }
}

export default ToolBox
