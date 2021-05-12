import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
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
    id: this.props.selectedRoom.id,
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

  componentWillUnmount = () => {
    console.log('Chat unmounted')
    cable.subscriptions.subscriptions.forEach( subscription => {
      subscription.unsubscribe()
    })
    cable.disconnect()
    // now null-ing is executed by unsubscribe of action_cable for gamePlay
  }

  handleReceivedChat = response => {
    const { chat } = response
    this.checkForPhrase( chat, this.props.selectedRoom.phrase )
    //console.log('chat= ', chat);
    this.props.addChat(chat)
  }

  checkForPhrase = (chatObj, phraseObj) => {
    console.log('checkForPhrase= ', phraseObj)
    let winner = false
    const end = 'end'
    phraseObj && chatObj.text.toLowerCase().includes(phraseObj.phrase.toLowerCase()) &&
    alert(`Hot Dang you got it: ${phraseObj.phrase}`)
  }

  render = () => {
    //console.log('orderedChats= ', orderedChats(this.props.chats));
    //console.log(cable);
    const { chats } = this.props.selectedRoom
    //console.log('chats= ', chats);

    return (
      <div id='chatWindow'>
        <h2>Chat Window</h2>
        { /* you can't pass down objects via props */ }
        <div ref={this.chatContainer} className='chat-messages'>
          { orderedChats(chats) ? orderedChats(chats) : suchEmpty }
          <div className='scroll-fix'
            ref={(el) => { this.messagesEnd = el }}>
          </div>
        </div>

        <ChatBoxInput roomId={this.roomURL} currentUser={this.props.currentUser} />
        <ChatBoxBot roomId={this.roomURL} currentUser={this.props.currentUser} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    selectedRoom: state.rooms.selectedRoom,
    currentUser: state.users.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadChats: roomId => { dispatch(loadChats(roomId)) },
    addChat: chatObj => { dispatch(addChat(chatObj)) },
    //gamePlayMsg: gamePlayObj => { dispatch(gamePlayMsg(gamePlayObj)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatsArea)

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  )
  return sortedChats.map(chat => {
    return <ChatMessage key={chat.id} text={chat.text} role={chat.role} name={chat.name} />
  })
}

const suchEmpty = 'Wow Such Empty'
