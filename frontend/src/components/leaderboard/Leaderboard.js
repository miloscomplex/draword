import React, { Component } from 'react'

class Leaderboard extends React.Component {

  render() {
    const leaders = this.props.leaders.map( (leader, index) => <li key={index}> {leader.name}, score: {leader.score}, time: {leader.time} </li>)

    return (
      <div className='leaderboard'>
        <ul>
          { leaders }
        </ul>
      </div>
    )
  }
}

export default Leaderboard
