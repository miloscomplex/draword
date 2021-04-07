import React, { Component } from 'react'
import LeaderboardComponent from '../components/leaderboard/Leaderboard'

class Leaderboard extends React.Component {

  render() {
    return (
      <div className='wrapper'>
        <div className='leaderboard'>
          <h1>leaderboard UI goes here</h1>
          <LeaderboardComponent />
        </div>
      </div>
    )
  }
}

export default Leaderboard
