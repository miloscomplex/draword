import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
import { API_ROOT, API_WS_ROOT } from '../../constants';
import actioncable from 'actioncable'
import ChatMessage from './ChatMessage';

class ChatsArea extends React.Component {

  state = {
    chats: [],
    roomId: 1
  }

  componentDidMount = () => {
    this.handleFetch()
    //this.cable = actioncable.createConsumer(API_WS_ROOT);
    this.chatsChannel()
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/chats`)
      .then(res => res.json())
      .then(chats => this.setState({ chats }))
  }

  chatsChannel = () => {
    this.cable.subscriptions.create({
    channel: `ChatsChannel`,
    },
      {connected: () => {
        console.log('connected!')
      },
        disconnected: () => {
          console.log('disconnected!');
        },
        received: data => {
          this.handleReceivedChat(data)
          console.log('data received')
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
    const { chats, roomId } = this.state
    return (
      <div id='chatWindow'>
        <h2>Chats Window</h2>
        { /* you can't pass down objects via props */ }
        <div className='chat-messages'>
          { orderedChats(this.state.chats) }
        </div>

        <ChatBoxInput roomId={1}/>
      </div>
    )
  }
}

export default ChatsArea;

// helpers

const orderedChats = chats => {
  const sortedChats = chats.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );
  return sortedChats.map(chat => {
    return <ChatMessage key={chat.id} text={chat.text} />
  });
};
