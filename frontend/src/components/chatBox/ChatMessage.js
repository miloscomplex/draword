import React from 'react'

class ChatMessage extends React.Component {

  render() {
    return (
      <p className='admin'>{ this.props.text }</p>
    )
  }
}

export default ChatMessage
