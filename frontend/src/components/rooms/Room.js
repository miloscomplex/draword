import React from 'react'
import { Link } from 'react-router-dom'
import GamePlay from '../../containers/GamePlay'

class Room extends React.Component {

  canYouDraw = selectedPhrase => {
    return (
      selectedPhrase ? <a className='disabled' disabled>Be a guesser</a>
      :
      <Link to={`/rooms/${this.props.id}`} onClick={ event => this.props.handleClick(event, this.props.id, true) }>you can draw</Link>
    )
  }

  render() {
    return (
      <li>
        <Link
          className='room' to={`/rooms/${this.props.id}`}
          onClick={ event => this.props.handleClick(event, this.props.id)}>
          { this.props.title }
        </Link>
        <p className='button' >{ this.canYouDraw(this.props.isPhraseSelected) }</p>
      </li>
    )
  }

}

export default Room
