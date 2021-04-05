import React, { Component } from 'react'
import ChatBoxInput from '../components/chatBox/ChatBoxInput'
import ChatMessages from '../components/chatBox/ChatMessages'

class ChatBox extends React.Component {

  state = {
    messages: ['check','check 1 2','check 1, 2, 3']
  }

  addMessage = message => {
    console.log(message);
    let merged = this.state.messages.concat(message)
    console.log(merged);
    return this.setState({ messages: merged })
  }

  render() {
    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        <ChatMessages messages={this.state.messages}/>
        <ChatBoxInput addMessage={this.addMessage}/>
      </div>
    )
  }
}

export default ChatBox
