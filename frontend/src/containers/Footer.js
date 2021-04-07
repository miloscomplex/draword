import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <div id='footer'>
        <p>
          <Link to='/'>DraWorD</Link>
          <Link to='/new'>New Game</Link>
          <Link to='/how-to-play'>How To Play</Link>
          <Link to='/leaderboard'>Leaderboard</Link>
        </p>
      </div>
    )
  }
}

export default Footer
