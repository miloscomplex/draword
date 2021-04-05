import React, { Component } from 'react'

class ChatBoxInput extends React.Component {

  state = {
    text: ''
  }

  handleOnChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleOnSubmit = event => {
    event.preventDefault()

    this.setState({
      text: ''
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
