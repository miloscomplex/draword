import React, { Component } from 'react'

class ChatMessages extends React.Component {

  messages = this.props.messages.map( message => <p>{message}</p>)

  render() {
    console.log(this.messages);
    return (
      <div className='chat-messages'>
        { this.messages }
      </div>
    )
  }
}

export default ChatMessages
