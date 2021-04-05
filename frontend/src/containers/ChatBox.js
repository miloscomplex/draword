import React, { Component } from 'react'
import ChatBoxInput from '../components/chatBox/ChatBoxInput'
import ChatMessages from '../components/chatBox/ChatMessages'

class ChatBox extends React.Component {

  render() {
    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        <ChatMessages />
        <ChatBoxInput />
      </div>
    )
  }
}

export default ChatBox
