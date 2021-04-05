import React, { Component } from 'react'
import ChatBoxInput from '../components/chatBox/ChatBoxInput'

class ChatBox extends React.Component {

  render() {
    return (
      <div id='chatWindow'>
        <h1>Chat Window Here</h1>
        <ChatBoxInput />
      </div>
    )
  }
}

export default ChatBox
