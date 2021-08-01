import React from 'react'
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
  render() {
    return (
      <div id='nav'>
        <Link to='/draword/new'>New Game</Link>
        <Link to='/draword/how-to-play'>How To Play</Link>
        <Link to='/draword/leaderboard'>Leaderboard</Link>
      </div>
    )
  }
}

export default Navigation
