import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
import { API_ROOT, API_WS_ROOT } from '../../constants';
import ChatMessage from './ChatMessage';
import cable from '../../services/Cable'

class ChatsArea extends React.Component {

  state = {
    chats: [],
    roomId: this.props.params.id
  }

  componentDidMount = () => {
    this.handleFetch()
    this.chatsChannel()
    this.scrollToBottom()
  }

  componentDidUpdate = () => {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/chats/${this.state.roomId}`)
      .then(res => res.json())
      .then(chats => this.setState({ chats }))
  }

  chatsChannel = () => {
    cable.subscriptions.create({
    channel: `ChatsChannel`,
    },
      {connected: () => {
        console.log('ChatsChannel connected!')
      },
        disconnected: () => {
          console.log('ChatsChannel disconnected!')
        },
        received: data => {
          this.handleReceivedChat(data)
          console.log('ChatsChannel data received')
        }
    })
  }

  handleReceivedChat = response => {
    const { chat } = response
    this.setState({
      chats: [...this.state.chats, chat]
    })
  }

  render = () => {
    console.log(cable);
    const { chats, roomId } = this.state
    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        { /* you can't pass down objects via props */ }
        <div ref={this.chatContainer} className='chat-messages'>
          { orderedChats(chats).length ? orderedChats(chats) : suchEmpty }
          <div className='scroll-fix'
            ref={(el) => { this.messagesEnd = el }}>
          </div>
        </div>

        <ChatBoxInput roomId={this.state.roomId}/>
      </div>
    )
  }
}

export default ChatsArea;

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedChats.map(chat => {
    return <ChatMessage key={chat.id} text={chat.text} />
  })
}

const suchEmpty = 'Wow Such Empty'
