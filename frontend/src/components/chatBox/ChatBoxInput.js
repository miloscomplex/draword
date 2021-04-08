import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../../constants';

class ChatBoxInput extends React.Component {

  state = {
    message: '',
    room_id: this.props.room_id
  }

  handleOnChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()

    fetch(`${API_ROOT}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });

    this.props.addMessage(this.state.message)
    // console.log('hellooooo');
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <form onSubmit={ event => this.handleOnSubmit(event) }>
        <input type='text' value={this.state.message} onChange={event => this.handleOnChange(event) }/>
        <button value='submit'>submit</button>
      </form>
    )

  }
}

export default ChatBoxInput
