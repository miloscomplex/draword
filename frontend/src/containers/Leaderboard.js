import React, { Component } from 'react'
import LeaderboardComponent from '../components/leaderboard/Leaderboard'

class Leaderboard extends React.Component {

  state = {
    leaders: [ { name: 'John Smith', score: 240, time: 23 }, { name: 'Reggy Uptown', score: 340, time: 45 }, { name: 'Sue Runner', score: 140, time: 50 } ]
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='leaderboard'>
          <h1>Leaderboard</h1>
          <LeaderboardComponent leaders={this.state.leaders} />
        </div>
      </div>
    )
  }
}

export default Leaderboard
