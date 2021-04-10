import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../../constants'

class ChatBoxInput extends React.Component {

  state = {
    text: '',
    room_id: this.props.roomId
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
        <input type='text' value={this.state.text} onChange={this.handleOnChange}/>
        <button value='submit'>submit</button>
      </form>
    )

  }
}

export default ChatBoxInput
