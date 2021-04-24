import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'


class ChatBoxBot extends React.Component {

  state = {
    text: `${this.props.currentUser.name}: has joined the game`,
    room_id: this.props.roomId,
    role: 'admin'
  }

  // intervalID = () => window.setInterval(this.myCallback, 2000)


  myCallback = () => {
     // Your code here
     // Parameters are purely optional.
     fetch(`${API_ROOT}/chats`, {
       method: 'POST',
       headers: HEADERS,
       body: JSON.stringify(this.state)
     })
  }

  componentDidMount = () => {
    this.myCallback()
  }

  render = () => {
    return (
      ''
    )
  }
}

export default ChatBoxBot
