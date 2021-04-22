import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
import { API_ROOT } from '../../constants';
import ChatMessage from './ChatMessage';
import cable from '../../services/Cable'
import { connect } from 'react-redux'
import { loadChats, addChat } from '../../redux/actions'
import ChatBoxBot from './ChatBoxBot'

class ChatsArea extends React.Component {

  roomURL = this.props.match.params.id

  componentDidMount = () => {
    this.chatsChannel()
    this.scrollToBottom()
    this.props.loadChats(this.roomURL)
  }

  componentDidUpdate = () => {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
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
    console.log('chat= ', chat)
    this.props.addChat(chat)
  }

  render = () => {
    console.log(cable);
    const { chats, roomId } = this.props.state
    //console.log('chats= ', chats);

    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        { /* you can't pass down objects via props */ }
        <div ref={this.chatContainer} className='chat-messages'>
          { orderedChats(this.props.chats) ? orderedChats(this.props.chats) : suchEmpty }
          <div className='scroll-fix'
            ref={(el) => { this.messagesEnd = el }}>
          </div>
        </div>

        <ChatBoxInput roomId={this.roomURL} />
        <ChatBoxBot roomId={this.roomURL} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    chats: state.rooms.selectedRoom.chats,
    state: state.rooms.selectedRoom
  }
}

const mapDispatchToProps = dispatch => {
  return {
    //loadPhrases: () => { dispatch(loadPhrases()) },
    loadChats: roomId => { dispatch(loadChats(roomId)) },
    addChat: chatObj => { dispatch(addChat(chatObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsArea)

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedChats.map(chat => {
    return <ChatMessage key={chat.id} text={chat.text} role={chat.role} />
  })
}

const suchEmpty = 'Wow Such Empty'
