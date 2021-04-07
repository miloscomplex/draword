import React, { Component } from 'react'

class Leaderboard extends React.Component {

  state = {
    name: 'John Smith',
    score: 240,
    time: 23,
  }
  
  render() {
    return (
      <div className='leaderboard'>
        <ul>
          <li>{this.state.name}, score: {this.state.score}, time: {this.state.time} </li>
          <li>{this.state.name}, score: {this.state.score}, time: {this.state.time} </li>
          <li>{this.state.name}, score: {this.state.score}, time: {this.state.time} </li>
          <li>{this.state.name}, score: {this.state.score}, time: {this.state.time} </li>
        </ul>
      </div>
    )
  }
}

export default Leaderboard
