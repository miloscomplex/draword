import React from 'react'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  render() {
    return (
      <div id='footer'>
        <p>
          <Link to='/'>Draword</Link>
          <Link className='footer-link' to='/draword/new'>New Game</Link>
          <Link className='footer-link' to='/draword/how-to-play'> How To Play</Link>
          <Link className='footer-link' to='/draword/leaderboard'>Leaderboard</Link>
        </p>
      </div>
    )
  }
}

export default Footer
