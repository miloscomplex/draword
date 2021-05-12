import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'


class ChatBoxBot extends React.Component {

  joined = {
    text: `has joined the game`,
    room_id: this.props.roomId,
    role: 'admin',
    name: this.props.currentUser.name
  }

  left = {
    text: `has left the game`,
    room_id: this.props.roomId,
    role: 'admin',
    name: this.props.currentUser.name
  }

  // intervalID = () => window.setInterval(this.myCallback, 2000)


  myCallback = (chatObj) => {
     // Parameters are purely optional.
     fetch(`${API_ROOT}/chats`, {
       method: 'POST',
       headers: HEADERS,
       body: JSON.stringify(chatObj)
     })
  }

  componentDidMount = () => {
    this.myCallback(this.joined)
  }

  componentWillUnmount = () => {
    this.myCallback(this.left)
  }

  render = () => {
    return (
      ''
    )
  }
}

export default ChatBoxBot
