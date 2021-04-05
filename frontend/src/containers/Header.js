import React, { Component } from 'react'
import Navigation from '../components/ui/Navigation'

class Header extends React.Component {
  render() {
    return (
      <div id='header'>
        <h1>DraWorD</h1>
        <Navigation />
      </div>
    )
  }
}

export default Header
