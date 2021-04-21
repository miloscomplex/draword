import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'


class ChatBoxBot extends React.Component {

  state = {
    text: 'This is a test',
    room_id: this.props.roomId
  }

  intervalID = () => window.setInterval(this.myCallback, 2000)


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
    this.intervalID()
  }

  render() {
    return (
      <p>hi there</p>
    )

  }
}

export default ChatBoxBot
