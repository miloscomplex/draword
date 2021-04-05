import React, { Component } from 'react'

class ChatBoxInput extends React.Component {

  state = {
    message: ''
  }

  handleOnChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()
    this.props.addMessage(this.state.message)
    this.setState({
      message: ''
    })
  }

  render() {
    return (
      <form onSubmit={ event => this.handleOnSubmit(event) }>
        <input type='text' value={this.state.text} onChange={event => this.handleOnChange(event) }/>
        <button value='submit'>submit</button>
      </form>
    )

  }
}

export default ChatBoxInput
