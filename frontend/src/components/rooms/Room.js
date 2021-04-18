import React from 'react'
import { Link } from 'react-router-dom'
import GamePlay from '../../containers/GamePlay'

class Room extends React.Component {

  canYouDraw = selectedPhrase => {
    return (
      selectedPhrase ? <button disabled>you cannot draw </button> :<button onClick={ event => this.props.handleClick(event, this.props.id) }>you can draw</button>
    )
  }

  render() {
    return (
      <li>
        <Link to={`/rooms/${this.props.id}`} > { this.props.title }</Link>
        <p>{ this.canYouDraw(this.props.isPhraseSelected) }</p>
      </li>
    )
  }

}

export default Room
