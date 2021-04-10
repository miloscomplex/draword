import React from 'react'

class Room extends React.Component {

  render() {
    return (
      <li><a href={'/rooms/' + this.props.id} >{this.props.title }</a></li>
    )
  }
}

export default Room
