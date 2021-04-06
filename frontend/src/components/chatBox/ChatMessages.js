import React, { Component } from 'react'

class ChatMessages extends React.Component {

  render() {
    const messages = this.props.messages.map( (message, index) => <p key={index}>{message}</p> )
    //console.log(this.messages);
    return (
      <div className='chat-messages'>
        { messages }
      </div>
    )
  }
}

export default ChatMessages
