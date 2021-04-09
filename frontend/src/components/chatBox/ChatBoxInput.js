import React, { Component } from 'react'
import { API_ROOT, HEADERS } from '../../constants';

class ChatBoxInput extends React.Component {

  state = {
    text: '',
    room_id: this.props.room_id
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ room_id: nextProps.room_id });
  };

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

    //this.props.addMessage(this.state.message)
    // console.log('hellooooo');
    this.setState({
      text: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit} >
        <input type='text' value={this.state.text} onChange={this.handleOnChange}/>
        <button value='submit'>submit</button>
      </form>
    )

  }
}

export default ChatBoxInput
