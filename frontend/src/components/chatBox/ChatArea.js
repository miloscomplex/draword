import React from 'react';
import ChatBoxInput from '../chatBox/ChatBoxInput';
import { API_ROOT, API_WS_ROOT } from '../../constants';
import actioncable from 'actioncable'
import ChatMessage from './ChatMessage';
import cable from '../../services/Cable'

class ChatsArea extends React.Component {

  state = {
    chats: [],
    roomId: 1
  }

  componentDidMount = () => {
    this.handleFetch()
    this.chatsChannel()
  }

  componentWillUnmount = () => {
    cable.disconnect()
    cable.subscriptions.subscriptions.forEach( subscription =>{
      subscription.unsubscribe()
    })
  }

  handleFetch = () => {
    fetch(`${API_ROOT}/chats`)
      .then(res => res.json())
      .then(chats => this.setState({ chats }))
  }

  chatsChannel = () => {
    cable.subscriptions.create({
    channel: `ChatsChannel`,
    },
      {connected: () => {
        console.log('connected!')
      },
        disconnected: () => {
          console.log('disconnected!')
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
    console.log(cable);
    console.log(cable.subscriptions.subscriptions);
    const { chats, roomId } = this.state
    return (
      <div id='chatWindow'>
        <h2>Chats Window</h2>
        { /* you can't pass down objects via props */ }
        <div className='chat-messages'>
          { orderedChats(chats) }
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
