import React from 'react'
import { Link } from 'react-router-dom'
import GamePlay from '../../containers/GamePlay'

class Room extends React.Component {

  canYouDraw = selectedPhrase => {
    return (
      selectedPhrase ? <Link className='disabled' >you cannot draw </Link>
      :
      <Link to={`/rooms/${this.props.id}`} isDrawing={true} onClick={ event => this.props.handleClick(event, this.props.id) }>you can draw</Link>
    )
  }

  render() {
    return (
      <li>
        <Link className='room' to={`/rooms/${this.props.id}`} > { this.props.title }</Link>
        <p className='button' >{ this.canYouDraw(this.props.isPhraseSelected) }</p>
      </li>
    )
  }

}

export default Room
