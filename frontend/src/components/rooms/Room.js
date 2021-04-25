import React from 'react'
import { Link } from 'react-router-dom'

class Room extends React.Component {

  render() {
    return (
      <li>
        <Link className='room' to={`/rooms/${this.props.id}`} >
          { this.props.title }
        </Link>
        <p className='button' >
          <Link to={`/rooms/${this.props.id}`}>enter room</Link>
        </p>
      </li>
    )
  }

}

export default Room
