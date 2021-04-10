import React from 'react'

class ChatMessage extends React.Component {

  render() {
    return (
      <p>{ this.props.text }</p>
    )
  }
}

export default ChatMessage
