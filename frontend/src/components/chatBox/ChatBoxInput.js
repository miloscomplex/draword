import React from 'react'
import { API_ROOT, HEADERS } from '../../constants'


class ChatBoxInput extends React.Component {

  const { roomId, currentUser, selectedRoom } = this.props

  state = {
    text: '',
    room_id: this.props.roomId,
    role: selectedRoom.drawer_id === currentUser.id ? 'drawer' : 'guesser',
    name: this.props.currentUser.name,
  }

  handleOnChange = event => {
    this.setState({
      text: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ text: '' })
  }

  render() {
    return (
      <form name='chatBoxForm' onSubmit={event => this.handleOnSubmit(event)} >
        <input type='text' minLength='2' value={this.state.text} onChange={this.handleOnChange}/>
        <button value='submit'>submit</button>
      </form>
    )

  }
}

export default ChatBoxInput
