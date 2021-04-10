import React from 'react'
import { Link } from 'react-router-dom'

class Room extends React.Component {

  render() {
    return (
      <li><Link to={`/rooms/${this.props.id}`} >{this.props.title }</Link></li>
    )
  }
}

export default Room
