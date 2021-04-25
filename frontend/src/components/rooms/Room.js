import React from 'react'
import { Link } from 'react-router-dom'

class Room extends React.Component {

  canYouDraw = selectedPhrase => {
    return (
      selectedPhrase ? <a className='disabled' disabled>You can only guess</a>
      :
      <Link to={`/rooms/${this.props.id}`} onClick={ event => this.props.handleDrawerClick(this.props.id, true) }>click to draw</Link>
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
