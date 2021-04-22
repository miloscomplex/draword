import React from 'react'

class ChatMessage extends React.Component {
  guesser = 'guesser'

  render() {
    return (
      <p className={ this.props.role ? this.props.role : this.guesser }>
        { this.props.text }
      </p>
    )
  }
}

export default ChatMessage
