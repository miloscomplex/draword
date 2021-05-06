import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from './Navigation'
import { connect } from 'react-redux'

class Header extends React.Component {

  render() {

    return (
      <div id='header'>
        <h1><Link to='/'>draword</Link></h1>
        <Navigation />
      </div>
    )
  }
}

export default Header
