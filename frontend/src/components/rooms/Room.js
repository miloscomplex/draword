import React from 'react'
import { Link } from 'react-router-dom'
import GamePlay from '../../containers/GamePlay'

class Room extends React.Component {

  canYouDraw = selectedPhrase => {
    return (
      selectedPhrase ? <a className='disabled' >you cannot draw </a>
      :
      <Link to={`/rooms/${this.props.id}`} onClick={ event => this.props.handleClick(event, this.props.id, true) }>you can draw</Link>
    )
  }

  render() {
    return (
      <li>
        <Link to={`/rooms/${this.props.id}`} >{this.props.title }</Link>
        <p>{ canYouDraw(this.props.isPhraseSelected) }</p>
      </li>
    )
  }

}

export default Room
