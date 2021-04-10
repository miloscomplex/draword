import React from 'react'

class Room extends React.Component {

  render() {
    return (
      <li>{ this.props.title }</li>
    )
  }
}

export default Room
