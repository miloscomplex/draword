import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/ui/Navigation'

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
