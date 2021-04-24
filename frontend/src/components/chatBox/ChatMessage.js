import React from 'react'

class ChatMessage extends React.Component {
  guesser = 'guesser'

  render() {
    return (
      <p className={this.props.role}>
        <strong>{ this.props.name }</strong> { this.props.text }
      </p>
    )
  }
}

export default ChatMessage
