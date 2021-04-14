import React from 'react'
import { Link } from 'react-router-dom'

class Room extends React.Component {

  render() {
    return (
      <li>
        <Link to={`/rooms/${this.props.id}`} >{this.props.title }</Link>
        <p>{ canYouDraw(this.props.selectedPhrase) }</p>
      </li>
    )
  }
}

export default Room

const canYouDraw = selectedPhrase => {
  return (
    selectedPhrase ? <button>no click</button> : <button>you can draw</button>
  )
}
